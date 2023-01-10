import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {

  friendList ! : Friend[];
  friendInF! : Friend;
  statuses: Status[] = [];
  userToken!:any;

  constructor(public friendservice :FriendService, private router: Router) {

  }


  ngOnInit(): void {

    this.userToken = this.friendservice.userToken;
    this.getAllFriends();

  }

  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }
  getAllFriends(){
    this.friendservice.getAllFriends(this.friendservice.userToken.id).subscribe((friends) => {
      this.friendList=friends;
    })
  }
  showProfile(id : number){
    this.friendservice.idInf=id;
    this.router.navigate(['showProfile'])
  }
}
