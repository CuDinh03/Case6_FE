import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FileUploadService} from "../../service/file-upload.service";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {
  statuses: Status[] = [];
  listFound!:Friend[];
  listSent!:Friend[];
  listReceived!: Friend[];
  status1: any;
  statusE!: Status;
  userToken: any;
  idS!: number;
  imgowner: any;

  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  friendList !: Friend[];
  friendInF!: Friend;


  constructor(private fileUploadService: FileUploadService, public friendService: FriendService, private router: Router, private statusService: StatusService, private authenticationService: AuthenticationService) {
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
    this.friendService.userToken=this.userToken;
    this.requestReceived();

  }

  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl(""),
  })

  showProfile(id : number){
    this.friendService.idInf=id;
    // this.router.navigate(['showProfile'])
  }

  create() {
    this.status1 = {
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

  mainView() {
    this.router.navigate(['/main'])
  }

  profileView() {
    this.router.navigate(['/profile'])
  }

  searchView() {
    this.router.navigate(['/search'])
  }


  logout() {
    this.authenticationService.logout();
  }
  findFriend(name: any){
    this.friendService.findFriend(name).subscribe((data) => {
      this.listFound=data;
    })
    alert(this.listFound.length)
  }
  requestSent(){
    this.friendService.listRequest(this.userToken.id).subscribe((requestSent) => {
      this.listSent=requestSent;
      console.log(requestSent)
    })
  }
  requestReceived(){
    this.friendService.listReceived(this.userToken.id).subscribe((requestReceived)=>{
      this.listReceived= requestReceived;
    })
  }


}
