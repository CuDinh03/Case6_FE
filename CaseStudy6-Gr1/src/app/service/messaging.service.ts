import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs'
import {AngularFireMessaging} from "@angular/fire/compat/messaging";

@Injectable()
export class MessagingService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    // @ts-ignore
    this.subject.next();
  }

  onMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
