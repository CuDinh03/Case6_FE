import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Account} from "../../model/account";
import {Acc} from "../../model/acc";

@Component({
  selector: 'app-page-profile',
  templateUrl:'./page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {
  account!: Acc;
  stt1!: number;
  stt2!: number;

  friendList ! : Friend[];
  friendInF! : Friend;
  statuses: Status[] = [];
  userToken!:any;
  listSent!:Friend[];
  listFound!:Friend[];
  listReceived!: Friend[];
  status1: any;
  id!: number;



  constructor(public friendService : FriendService, private router: Router, private statusService: StatusService, private authenticationService: AuthenticationService ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.view();

    this.getAllFriends();
    this.getTT()
  }

  view(): void {
    this.statusService.findAll(this.userToken.id).subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })

  }
  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl(""),
  })
  create() {
    this.status1 ={
      content: this.createForm.value.content,
      status: this.createForm.value.status,
      account: {
        id: this.userToken.id
      }
    }
    console.log(this.status1);
    this.statusService.saveStatus(this.statuses).subscribe((data) => {
      this.createForm.reset();
      this.view();
      this.mainView();
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


  getAllFriends(){
    this.friendService.getAllFriends(this.userToken.id).subscribe((friends) => {
      this.friendList=friends;
      console.log("friendList")
      console.log(this.friendList)
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

  logout() {
    this.authenticationService.logout();
  }

  searchView() {
    this.router.navigate(['/search'])
  }

  updateAccount() {

    if(this.stt1==1&&this.stt2==1){
      this.account.status=4
    }
    if(this.stt1==1&&this.stt2==2){
      this.account.status=5
    }
    if(this.stt1==2&&this.stt2==1){
      this.account.status=6
    }
    if(this.stt1==2&&this.stt2==2){
      this.account.status=7
    }
    this.friendService.updateAccount(this.account);
    this.logout()


  }
  getTT() {
    this.friendService.getAccountByID(this.userToken.id).subscribe((data)=>{
      this.account = data;
      if(this.account.status==4){
        this.stt1=1;
        this.stt2=1;
      }
      if(this.account.status==5){
        this.stt1=1;
        this.stt2=2;
      }if(this.account.status==6){
        this.stt1=2;
        this.stt2=1;
      }if(this.account.status==7){
        this.stt1=2;
        this.stt2=2;
      }
    })
  }





}
