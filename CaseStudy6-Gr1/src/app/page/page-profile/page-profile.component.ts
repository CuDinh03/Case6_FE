import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-page-profile',
  templateUrl:'./page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {

  friendList ! : Friend[];
  friendInF! : Friend;
  statuses: Status[] = [];
  status1: any;
  id!: number;
  userToken:any;

  constructor(public friendservice :FriendService, private router: Router, private statusService: StatusService ) {

  }

  ngOnInit(): void {

    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.view();
    // this.userToken = this.friendservice.userToken;
    this.getAllFriends();
  }

  view(): void {
    this.statusService.findByAccountId(this.userToken.id).subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }



  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl(""),
  })
  // create() {
  //   this.status1 ={
  //     content: this.createForm.value.content,
  //     status: this.createForm.value.status,
  //     account: {
  //       id: this.userToken.id
  //     }
  //   }
  //   console.log(this.status1);
  //   this.statusService.saveStatus(this.statuses).subscribe((data) => {
  //     this.createForm.reset();
  //     this.view();
  //     this.mainView();
  //   })
  // }

  getAllFriends(){
    this.friendservice.getAllFriends(this.userToken.id).subscribe((friends) => {
      this.friendList=friends;

    })
  }
  showEdit(index: number) {
    this.statusService.findById(index).subscribe((result) => {
      this.id = index;
      this.createForm.patchValue({
        content: result.content,
        status: result.status,
      })
    })
  }

  edit(index: number) {
    // @ts-ignore
    const status2: Status = {content: this.createForm.value.content, status: this.createForm.value.status}
    console.log(status2);
    this.statusService.editStatus(index, status2).subscribe(() => {
      this.id = -1;
      this.view();
      this.createForm.reset();
      this.profileView();
    })
  }

  deleteEdit(index: number) {
    this.statusService.deleteStatus(index).subscribe(() => {
      this.view();
      this.profileView();
    })
  }

  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }

  showProfile(id : number){
    this.friendservice.idInf=id;
    this.router.navigate(['showProfile'])
  }



}
