import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";

@Component({
  selector: 'app-page-profile',
  templateUrl:'./page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {

  friendList ! : Friend[];
  friendInF! : Friend;
  statuses: Status[] = [];
  userToken: any;

  constructor(public friendservice :FriendService, private router: Router, private statusService: StatusService ) {

  }

  view(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }


  ngOnInit(): void {
    // @ts-ignore
    // this.statusService.findById(localStorage.getItem("id")).subscribe((data) => {
    //   this.statuses = data;
    //   console.log(this.statuses);
    // })
    this.userToken = JSON.parse(localStorage.getItem("userToken"));

    this.getAllFriends();
  }

  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }
  getAllFriends(){
    this.friendservice.getAllFriends().subscribe((friends) => {
      this.friendList=friends;

    })
  }
  showProfile(id : number){
    this.friendservice.idInf=id;
    this.router.navigate(['showProfile'])
  }


}
