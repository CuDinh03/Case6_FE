import {Component, OnInit} from '@angular/core';
import {FriendService} from "../FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.idInf = this.route.snapshot.paramMap.get("smty") ;
    this.isFriendorNot();
    this.getInFor();
    this.getMutualFriend();
    this.getAllFriendsOfFriend();
  }

  idInf!:any;
  mutualFriend!:Friend[];
  isFriend!:number;
  friend!:Friend;
  userToken: any;
  friendList!:Friend[];
  listFound!:Friend[];
  listReceived!:Friend[];


  constructor(private friendService: FriendService,private router: Router, private authenticationService: AuthenticationService,private route :ActivatedRoute) {
  }
  isFriendorNot() {
    this.friendService.isFriend(this.userToken.id,this.idInf).subscribe((data1)=>{
      this.isFriend=data1;
      if (this.isFriend==0){
        this.friendService.isFriend(this.idInf,this.userToken.id).subscribe((data2)=>{
          if (data2==1){
            this.isFriend=4;
          }
        })

      }

    })
  }

  searchView() {
    this.router.navigate(['/search'])
  }
getInFor(){
    this.friendService.getInFor(this.idInf).subscribe((data)=>{
      this.friend = data;
    });
  }

  findFriend(name: any){
    this.friendService.findFriend(name).subscribe((data) => {
      this.listFound=data;
    })
  }
  getMutualFriend(): void{
    this.friendService.getMutualFriend(this.userToken.id,this.idInf).subscribe((data)=>{
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
    this.friendService.getAllFriends1(this.idInf).subscribe((data)=>{
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
    this.isFriend=0
    this.friendService.removeRequest(id1,id2);
  }

  logout() {
    this.authenticationService.logout();
  }
  acceptRequest(){
    this.isFriend=2
    this.friendService.acceptRequest(this.userToken.id,this.idInf);
  }

}
