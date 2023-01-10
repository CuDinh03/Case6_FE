import {Component, OnInit} from '@angular/core';
import {FriendService} from "../FriendsService/friend.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Friend} from "../../model/friend";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{
  ngOnInit(): void {
    this.getInFor();
  }
  friend!:Friend;
  constructor(private friendService: FriendService,private router: Router) {
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


}
