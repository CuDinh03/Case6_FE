import {Component, OnInit} from '@angular/core';
import {FriendService} from "../FriendsService/friend.service";
import {Friend} from "../../model/friend";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import { ActivatedRoute } from '@angular/router';
import { NgZone } from '@angular/core';
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {FormControl, FormGroup} from "@angular/forms";
import {ImageService} from "../../service/image.service";
import {img} from "../../model/img";
import {CommentService} from "../../service/comment.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.idInf = this.route.snapshot.paramMap.get("smty") ;
    this.userName = this.route.snapshot.paramMap.get("smt") ;
    this.findByUserName();
    this.isFriendorNot();
    this.getInFor();
    this.getMutualFriend();
    this.getAllFriendsOfFriend();
    this.view();
  }

  idInf!:any;
  userName: any;
  mutualFriend!:Friend[];
  isFriend!:number;
  friend!:Friend;
  userToken: any;
  friendList!:Friend[];
  listFound!:Friend[];
  listReceived!:Friend[];

  statuses: Status[] = [];
  value = '';
  comment1 !: any;
  idS!: number;
  listPicture: img[] = [];
  id!: number;

  constructor(private ngZone: NgZone,
              private statusService: StatusService,
              private imageService: ImageService,
              private commentService: CommentService,
              private friendService: FriendService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private route :ActivatedRoute) {
  }

  view(): void {
    this.statusService.findByAccountId(this.idInf).subscribe((data) => {
      this.statuses = data[0];
      console.log(this.idInf);
    })}

  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl(""),
  })

  showEdit(index: number) {
    this.statusService.findById(index).subscribe((result) => {
      this.idS = index;
      this.createForm.patchValue({
        content: result.content,
        status: result.status,
      })
      this.showImg(index)
    })
  }

  showImg(index: number) {
    this.imageService.findByStatusId(index).subscribe((data) => {
      this.listPicture = data[0];
      console.log(this.listPicture);
    })
  }

  comment(value: any) {
    this.value = value;
    this.comment1 = {
      text: this.value,
      status: 1,
      account: {
        id: this.userToken.id
      }
    }
    this.commentService.saveComment(this.comment1, this.id).subscribe((data)=>{
      console.log(data);
      console.log(this.comment1);
      this.resetForm();
      this.view();
      this.refresh(this.idInf);
    })
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data)=> {
      this.view();
      this.refresh(this.idInf);
    }                                                                                                           )
  }

  refresh(id: number) {
    if (id==this.userToken.id){
      this.router.navigate(['/profile']);
    }else {
      this.idInf=id;
      this.isFriendorNot();
      this.getInFor();
      this.getMutualFriend();
      this.getAllFriendsOfFriend();
      this.router.navigate(['/showProfile/'+id]);
      }
  }
  isFriendorNot() {
    this.friendService.isFriend(this.userToken.id,this.idInf).subscribe((data1)=>{
      this.isFriend=data1;
      if (this.isFriend==0){
        this.friendService.isFriend(this.idInf,this.userToken.id).subscribe((data2)=>{
          if (data2==1){
            this.isFriend=4;
          }
        })
      }
    })
  }

  searchView() {
    this.router.navigate(['/search'])
  }
getInFor(){
    this.friendService.getInFor(this.idInf).subscribe((data)=>{
      this.friend = data;
    });
  }
  findByUserName(){
    this.friendService.findByUserName(this.userName).subscribe((data)=>{
      this.friend = data;
    })
  }

  getMutualFriend(): void{
    this.friendService.getMutualFriend(this.userToken.id,this.idInf).subscribe((data)=>{
      this.mutualFriend = data;
    });
  };
  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }
  getAllFriendsOfFriend(){
    this.friendService.getAllFriends1(this.idInf).subscribe((data)=>{
      this.friendList= data;
    })
  }
  removeFriend(id1:number,id2:number){
    this.isFriend=0;
this.friendService.removeFriend(id1,id2);
  }
  addFriend(id1:number,id2:number){
    this.isFriend=1;
    this.friendService.addFriend(id1,id2);
  }
  removeRequest(id1:number,id2:number){
    this.isFriend=0
    this.friendService.removeRequest(id1,id2);
  }
  acceptRequest(){
    this.isFriend=2
    this.friendService.acceptRequest(this.userToken.id,this.idInf);
  }
  logout() {
    this.authenticationService.logout();
  }
 removeRequestSent(id1:number,id2:number){
    this.isFriend=0
   this.friendService.removeRequestReceived(id1, id2)

 }

  resetForm() {
    this.createForm.patchValue({content: "", status: "1"});
  }

  resetmodal(): void {
    this.listPicture = [];
    this.resetForm();
  }
}
