import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {FriendService} from "../../friends/FriendsService/friend.service";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {
  statuses: Status[] = [];
  status1: any;
  statusE!: Status;
  userToken : any;
  idS!: number;
  imgowner: any;

  friendList ! : Friend[];
  friendInF! : Friend;

  constructor(public friendService :FriendService, private router: Router, private statusService: StatusService ) {
  }

  view(): void {
    this.statusService.getAll().subscribe((data) => {
      this.statuses = data[0];

      console.log(this.statuses);
    })
  }

  ngOnInit(): void {
    this.view();
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    // this.friendService.userToken=this.userToken;
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
    this.statusService.saveStatus(this.status1).subscribe((data) => {
      this.createForm.reset();
      this.view();
      this.mainView();
    })

  }

  getAllFriends(){
    this.friendService.getAllFriends(this.friendService.idInf).subscribe((friends) => {
      this.friendList=friends;

    })
  }

  showEdtit(index: number) {
    this.statusService.findById(index).subscribe((result) => {
      this.idS = index;
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
      this.idS = -1;
      this.view();
      this.createForm.reset();
      this.mainView();
    })
  }

  deleteEdit(index: number) {
    this.statusService.deleteStatus(index).subscribe(() => {
      this.view();
      this.mainView();
    })
  }

  mainView(){
    this.router.navigate(['/main'])
  }

  profileView(){
    this.router.navigate(['/profile'])
  }

  modalView(){
    this.router.navigate(['/modal'])
  }

}
