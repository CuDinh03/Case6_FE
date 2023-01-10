import {Component, OnInit} from '@angular/core';
import {FriendService} from "../FriendsService/friend.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Friend} from "../../model/friend";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../account/AccountService/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{

  userToken: any;

  ngOnInit(): void {
    this.getInFor();
    // @ts-ignore
    this.userToken=JSON.parse(localStorage.getItem("userToken"));
  }
  friend!:Friend;
  constructor(private friendService: FriendService,private router: Router , private authenticationService : AuthenticationService) {
  }
getInFor(){
    this.friendService.getInFor(this.friendService.idInf).subscribe((data)=>{
      this.friend = data;
    });

  }
  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }
logout(){
    this.authenticationService.logout()
}

}
