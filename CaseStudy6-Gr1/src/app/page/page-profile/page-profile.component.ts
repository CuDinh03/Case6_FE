import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Friend} from "../../model/friend";
import {StatusService} from "../../service/status.service";
import {Status} from "../../model/status";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FormControl, FormGroup} from "@angular/forms";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {Acc} from "../../model/acc";
import {finalize} from "rxjs";
import {img} from "../../model/img";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ImageService} from "../../service/image.service";
import {Account} from "../../model/account";
import {CommentService} from "../../service/comment.service";

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

  selectedImage: any;
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  listPicture: img[] = [];
  picture!: any;

  value = '';
  comment1 !: any;
  idS!: number;


  constructor(private storage: AngularFireStorage,
              private commentService: CommentService,
              private imageService: ImageService,
              public friendService : FriendService,
              private router: Router,
              private statusService: StatusService,
              private authenticationService: AuthenticationService ) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.view();
    this.getAllFriends();
    this.getTT()
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
      this.profileView();
    })
  }

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
      this.profileView();
    })

  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data)=> {
      this.view();
      this.profileView();
    }                                                                                                           )
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
    this.imageService.saveone(this.picture);
    this.picture = this.imageService.findLastPicture();
    this.account.img = this.picture;
    console.log(this.account);
    this.friendService.updateAccount(this.account);
    this.logout();
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

  uploadFileImg(): void {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();
  }

  submit(): void {
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize
      (() => (fileRef.getDownloadURL().subscribe(url => {
        console.log(url);
        let image: img = {id: 0, name: "", status: 1};
        image.name = url;
        this.picture = image;
        this.imageService.saveone(this.picture);
        console.log(this.picture);
      })))).subscribe(result => {
    });
    }
  }

  showImg(index: number) {
    this.imageService.findByStatusId(index).subscribe((data) => {
      this.listPicture = data[0];
      console.log(this.listPicture);
    })
  }

  deletePicture(index: number,id: number): void {
    this.listPicture.splice(index, 1);
    if(id !== 0){
      this.imageService.deleteImage(id).subscribe((data)=>{})
    }
  }

  editPicture(id: number): void {
    console.log(id);
    console.log(this.listPicture);
    this.imageService.editPicture(id, this.listPicture).subscribe((data) => {
    })
  }

  resetForm() {
    this.createForm.patchValue({content: "", status: "1"});
  }

  resetmodal(): void {
    this.listPicture = [];
    this.resetForm();
  }
}
