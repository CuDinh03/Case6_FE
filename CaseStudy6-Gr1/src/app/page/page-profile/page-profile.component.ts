import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {FormControl, FormGroup} from "@angular/forms";

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
  ngOnInit(): void {
    this.getAllFriends();
    this.view();
  }
  view(): void{
    this.statusService.findByAccountId(2).subscribe((data) => {
      this.statuses= data[0];
      console.log(data);
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
        id: localStorage.getItem("id")
      }
    }
    this.statusService.saveStatus(this.status1).subscribe((data) => {
      this.createForm.reset();
      this.router.navigate(["/main"]);
    })

  }

  showEdit(index: number) {
    console.log(index);
    this.statusService.findById(index).subscribe((result) => {
      console.log(result);
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
      this.view();
      this.createForm.reset();
      this.router.navigate(["/main"]);
    })
  }

  deleteEdit(index: number) {
    this.statusService.deleteStatus(index).subscribe(() => {
      this.view();
      this.router.navigate(['/main'])})
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



}
