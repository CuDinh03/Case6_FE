import { Component } from '@angular/core';
import {Stomp} from "@stomp/stompjs";

const url = 'ws://localhost:8080/gkz-stomp-endpoint/websocket';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  title = 'grokonez';
  description = 'Angular-WebSocket Demo';
  message: string = "";

  greetings: string[] = [];
  disabled = true;
  name: string | undefined;
  private stompClient: any;

  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  connect() {
    // đường dẫn đến server

    this.stompClient = Stomp.over(function(){
      return new WebSocket(url)
    });
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      // là chờ xèm thằng server gửi về.
      _this.stompClient.subscribe('/topic/public', function (hello: any) {
        _this.showGreeting(JSON.parse(hello.body).greeting);
      });

    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.setConnected(false);
    console.log('Disconnected!');
  }

  sendName() {
    this.stompClient.send(
      '/gkz/hello',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify({'name': this.name, 'message': this.message})
    );
  }

  showGreeting(message: any) {
    this.greetings.push(message);
  }

}
