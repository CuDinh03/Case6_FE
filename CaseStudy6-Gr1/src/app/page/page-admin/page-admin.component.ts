import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {AdminService} from "../../account/Admin/admin.service";
import {Account} from "../../model/account";
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FileUploadService} from "../../service/file-upload.service";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {ImageService} from "../../service/image.service";
import {CommentService} from "../../service/comment.service";
import {LikesService} from "../../service/likes.service";
import {finalize} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
  checkAdmin!: boolean;
  idToBlock!:number;
  listAccount: any;
  check!:number;

  status!: any;
  friendList !: Friend[];
  p: any;
  page: any;
  statuses: Status[] = [];

  value = '';
  listFound!:Friend[];
  listSent!:Friend[];
  listReceived!: Friend[];

  userToken: any;
  idS!: number;
  img: any;

  id: any;

  like1: any;

  constructor(private router: Router,
              private statusService: StatusService,
              private adminService: AdminService,
              private storage: AngularFireStorage,
              private fileUploadService: FileUploadService,
              public friendService: FriendService,
              private authenticationService: AuthenticationService,
              private imageService: ImageService,
              private commentService: CommentService,
              private iLikeService: LikesService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.adminService.getAllUser().subscribe((data) => {
      this.listAccount = data;
      for (let i = 0; i < this.listAccount.length; i++) {
        if(this.listAccount[i].roles[0].name=="ADMIN"){
          this.listAccount.splice(i, 1);
        }
      }
    })

  }
  view(): void {
    this.statusService.findAll(this.userToken.id).subscribe((data) => {
      this.statuses = data[0];
      if (this.userToken.roles[0].id ==1 ){
        this.checkAdmin = true;
      }else {this.checkAdmin =false }

      console.log(this.statuses);
      this.img = data[0][0].img;
      console.log(this.img);
    })
  }

  disableUser() {
    this.adminService.disableUser(this.idToBlock).subscribe(() => {
    })
  }


  undisableUser(){
    this.adminService.undisableUser(this.idToBlock).subscribe(() => {
    })
  }


  takeId(id:number){
    this.idToBlock=id;
  }
  showProfile(id : number){
    this.friendService.idInf=id;

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

  findFriend(name: any) {
    this.friendService.findFriend(name).subscribe((data) => {
      this.listFound = data;
    })
    alert(this.listFound.length)
  }

  requestSent() {
    this.friendService.listRequest(this.userToken.id).subscribe((data1) => {
      this.listSent = data1;
    })
  }

  requestReceived() {
    this.friendService.listReceived(this.userToken.id).subscribe((data2) => {
      this.listReceived = data2
    })
  }

  getAllFriends(){
    this.friendService.getAllFriends(this.userToken.id).subscribe((friends) => {
      this.friendList=friends;
      console.log("friendList")
      console.log(this.friendList)
    })
  }

  clickLike(id: number){

    this.like1 = {
      account: {
        id: this.userToken.id
      }
    }
    this.iLikeService.saveLikes(this.like1, id).subscribe((data)=>{
      console.log(data);
      console.log(this.like1);
      this.view();
      this.mainView();
    })

  }




  // showComment(): void {
  //   this.commentService.findCommentByStatusId(this.statusE.id).subscribe((data) => {
  //     this.listComment = data[0];
  //
  //     console.log(this.listComment);
  //   })
  // }


}
