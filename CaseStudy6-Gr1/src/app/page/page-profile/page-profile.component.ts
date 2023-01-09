import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {Status} from "../../model/status";
import {StatusService} from "../../service/status.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-page-profile',
  templateUrl: './page-profile.component.html',
  styleUrls: ['./page-profile.component.css']
})
export class PageProfileComponent implements OnInit {
  friendList ! : Friend[];
  statuses: Status[] = [];
  status1: any;
  statusE!: Status;
  userName = localStorage.getItem('userName');
  constructor(
    public friendservice :FriendService,
    public statusService: StatusService,
    private router: Router) {
  }
  ngOnInit(): void {
    this.getAllFriends();
    this.statusService.getAll().subscribe((data) => {
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
        id: localStorage.getItem("id")
      }
    }
    this.statusService.saveStatus(this.status1).subscribe((data) => {
      this.createForm.reset()
      this.router.navigate(["/main"]);
    })

  }

  showedtit(index: number) {
    console.log(index);
    this.statusService.findById(index).subscribe((result) => {
      console.log(result);
      this.statusE = result;
      console.log(this.statusE);
    })
  }

  edit(index: number) {
    // @ts-ignore
    const status2: Status = {content: this.createForm.value.content, status: this.createForm.value.status}
    console.log(status2);
    this.statusService.editStatus(index, status2).subscribe(() => {
      this.router.navigate(['/main'])})
  }
  showStatus(index: number){
    console.log(index);
    this.statusService.findById(index).subscribe((result) => {
      console.log(result);
      this.statusE = result;
      console.log(this.statusE);
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


}
