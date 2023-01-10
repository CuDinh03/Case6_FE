import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent {
  statuses: Status[] = [];
  friendList: Friend[] = [];

  constructor(private router: Router, private statusService: StatusService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.statusService.findById(localStorage.getItem("id")).subscribe((data) => {
      this.statuses = data;
      console.log(this.statuses);
    })
  }

  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }

}
