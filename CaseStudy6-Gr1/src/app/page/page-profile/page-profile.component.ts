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
  status1: any;
  statusE!: Status;
  userName = localStorage.getItem('userName');
  id: any;
  constructor(public friendservice :FriendService, private statusService: StatusService ,private router: Router) {
  }

  view(): void{
    this.statusService.findByAccountId(2).subscribe((data) => {
      this.statuses= data[0];
      console.log(data);
    })
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

  ngOnInit(): void {
    this.getAllFriends();
    this.view();
  }

}
