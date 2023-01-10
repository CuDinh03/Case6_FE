import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {AuthenticationService} from "../../account/AccountService/authentication.service";


@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})

export class PageProfileComponent implements OnInit {

  friendList !: Friend[];
  friendInF!: Friend;

  userToken: any;

  constructor(public friendservice: FriendService, private router: Router, private authenticationService : AuthenticationService) {
  }


  mainView() {
    this.router.navigate(['/main'])
  }

  profileView() {
    this.router.navigate(['/profile'])
  }

  getAllFriends() {
    this.friendservice.getAllFriends().subscribe((friends) => {
      this.friendList = friends;

    })
  }

  showProfile(id: number) {
    this.friendservice.idInf = id;
    this.router.navigate(['showProfile'])
  }

  ngOnInit(): void {
    this.getAllFriends();
    // @ts-ignore
    this.userToken=JSON.parse(localStorage.getItem("userToken"));

  }
  logout(){
    this.authenticationService.logout();
  }
}
