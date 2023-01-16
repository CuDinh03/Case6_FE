import {Component, OnInit} from '@angular/core';
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {FileUploadService} from "../../service/file-upload.service";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-search-status',
  templateUrl: './search-status.component.html',
  styleUrls: ['./search-status.component.css']
})
export class SearchStatusComponent implements OnInit{
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
    this.statusService.showMystatus(this.userToken.id, this.anyThing).subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
    })
  }

  ngOnInit(): void {

    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.anyThing = this.route.snapshot.paramMap.get("any");
    this.view();

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



  logout() {
    this.authenticationService.logout();
  }






}
