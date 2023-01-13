import {Component, OnInit} from '@angular/core';
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {FileUploadService} from "../../service/file-upload.service";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.css']
})
export class PageSearchComponent implements OnInit{

  statuses: Status[] = [];
  isFriend=1;
  listFound!:Friend[];
  listSent!:Friend[];
  listReceived!: Friend[];
  status1: any;
  statusE!: Status;
  userToken: any;
  idS!: number;
  imgowner: any;
  anyThing!:any;

  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  friendList !: Friend[];
  friendInF!: Friend;


  constructor(private fileUploadService: FileUploadService, public friendService: FriendService, private router: Router, private statusService: StatusService, private authenticationService: AuthenticationService,private route : ActivatedRoute ) {
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
     this.anyThing = this.route.snapshot.paramMap.get("smt");
     this.findFriend();
    this.requestReceived();

  }

  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl(""),
  })

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
  findFriend(){
    if (this.anyThing!="listReceived"&&this.anyThing!="listSent"){
      this.friendService.findFriend(this.anyThing).subscribe((data1) => {
        this.listFound=data1;
        for (let i = 0; i < this.listFound.length; i++) {
          if (this.listFound[i].id == this.userToken.id) {
            this.listFound.splice(i,1);
          }
        }
      })
    }

    if(this.anyThing=="listReceived"){
      this.friendService.listReceived(this.userToken.id).subscribe((data2) => {
        this.listFound=data2;
      })
    }
    if(this.anyThing=="listSent"){
      this.friendService.listRequest(this.userToken.id).subscribe((data3) => {
        this.listFound=data3;
      })
    }

  }
  requestReceived(){
    this.friendService.listReceived(this.userToken.id).subscribe((requestReceived)=>{
      this.listReceived= requestReceived;

    })
  }
  findFriend2(smt:any){
    this.anyThing =smt;
    this.friendService.findFriend(this.anyThing).subscribe((data) => {
      this.listFound=data;
      for (let i = 0; i < this.listFound.length; i++) {
        if (this.listFound[i].id == this.userToken.id) {
          this.listFound.splice(i,1);
        }
      }
    })

  }
  acceptRequest(id:number){
    this.isFriend=2
    this.friendService.acceptRequest(this.userToken.id,id);
  }
  removeRequest(id2:number){
    this.isFriend=0;
    this.friendService.removeRequest(this.userToken.id,id2);
  }
  removeRequestReceived(id2:number){
  this.isFriend =0;
  }
  addFriend(id2:number){
    this.isFriend=1;
    this.friendService.addFriend(this.userToken.id,id2);
  }

}
