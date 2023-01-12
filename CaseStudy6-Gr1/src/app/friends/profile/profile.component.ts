import {Component, OnInit} from '@angular/core';
import {FriendService} from "../FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../account/AccountService/authentication.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));

    this.getInFor();
    this.getMutualFriend();
    this.getAllFriendsOfFriend();
  }
  mutualFriend!:Friend[];
  isFriend=2;
  friend!:Friend;
  userToken: any;
  friendList!:Friend[];

  constructor(private friendService: FriendService,private router: Router, private authenticationService: AuthenticationService) {
  }
getInFor(){
    this.friendService.getInFor(this.friendService.idInf).subscribe((data)=>{
      this.friend = data;
    });


  }
  getMutualFriend(): void{
    this.friendService.getMutualFriend(this.userToken.id,this.friendService.idInf).subscribe((data)=>{
      this.mutualFriend = data;
    });
  };
  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }
  getAllFriendsOfFriend(){
    this.friendService.getAllFriends1(this.friendService.idInf).subscribe((data)=>{
      this.friendList= data;
    })
  }
  removeFriend(id1:number,id2:number){
    this.isFriend=0;
this.friendService.removeFriend(id1,id2);
  }
  addFriend(id1:number,id2:number){
    this.isFriend=1;
    this.friendService.addFriend(id1,id2);
  }
  removeRequest(id1:number,id2:number){
    this.isFriend=0;
    this.friendService.removeRequest(id1,id2);
  }

  logout() {
    this.authenticationService.logout();
  }

}
