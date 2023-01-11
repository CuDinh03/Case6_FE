import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {AuthenticationService} from "../../account/AccountService/authentication.service";

@Component({
  selector: 'app-page-profile',
  templateUrl:'./page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {

  friendList ! : Friend[];
  statuses: Status[] = [];
  userToken!:any;

  constructor(public friendservice :FriendService, private router: Router, private statusService: StatusService, private authenticationService: AuthenticationService ) {

  }

  view(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }


  ngOnInit(): void {
    // @ts-ignore
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

  logout() {
    this.authenticationService.logout();
  }
}
