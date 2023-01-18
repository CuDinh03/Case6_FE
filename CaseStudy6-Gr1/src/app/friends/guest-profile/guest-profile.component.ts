import {Component, NgZone, OnInit} from '@angular/core';
import {FriendService} from "../FriendsService/friend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";

@Component({
  selector: 'app-guest-profile',
  templateUrl: './guest-profile.component.html',
  styleUrls: ['./guest-profile.component.css']
})
export class GuestProfileComponent implements OnInit{
  userName: any;
  friend!:Friend;
  friendList!:Friend[];
  statuses: Status[] = [];
  constructor(private ngZone: NgZone,
              private friendService: FriendService,
              private statusService: StatusService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private route :ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get("smt") ;
    this.findByUserName();
  }

  findByUserName(){
    this.friendService.findByUserName(this.userName).subscribe((data)=>{
      this.friend = data;
      console.log(data);
      this.view();
      this.getAllFriendsOfFriend(this.friend.id)
    })
  }

  getAllFriendsOfFriend(id:number){
    this.friendService.getAllFriends1(id).subscribe((data)=>{
      this.friendList= data;
    })
  }

  view(): void {
    this.statusService.findAllByGuestId(this.friend.id).subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }
}
