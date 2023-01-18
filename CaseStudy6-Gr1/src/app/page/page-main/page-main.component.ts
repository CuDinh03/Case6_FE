import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FileUploadService} from "../../service/file-upload.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {ImageService} from "../../service/image.service";
import {img} from "../../model/img";
import {CommentService} from "../../service/comment.service";
import {comment} from "../../model/comment";
import {LikesService} from "../../service/likes.service";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {
  statuses: Status[] = [];
  recommendList!:Friend[];

  value = '';
  listFound!:Friend[];
  listSent!:Friend[];
  listReceived!: Friend[];
  status1: any;
  statusE!: Status;
  userToken: any;
  idS!: number;
  img: any;
  comment1 !: any;
  id: any;

  like1: any;

  selectedImage: any;
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  // @ViewChild('uploadFile1', {static: true}) public avatarDom1: ElementRef | undefined;
  listPicture: img[] = [];
  listComment: comment[] = [];

  friendList !: Friend[];
  friendInF!: Friend;
  checkAdmin!: boolean;
  roleAdmin! : number;


  constructor(private storage: AngularFireStorage,
              private fileUploadService: FileUploadService,
              public friendService: FriendService,
              private router: Router,
              private statusService: StatusService,
              private authenticationService: AuthenticationService,
              private imageService: ImageService,
              private commentService: CommentService,
              private iLikeService: LikesService) {

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
  getRecommend(id:number){
     this.friendService.getRecommend().subscribe((data)=>{
       this.recommendList = data;
       this.recommendList.splice(id,1);
     })


  }


  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.view();
    this.friendService.userToken = this.userToken;
    this.requestSent();
    this.requestReceived();
    // this.showComment();
    this.getAllFriends();
    // @ts-ignore
    this.webSocketAPI = new WebSocketAPI(new PageMainComponent());
  }

  createForm = new FormGroup({
    content: new FormControl(""),
    status: new FormControl("1"),
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
      this.savePicture();
      this.resetForm();
      this.view();
      this.mainView()
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


  edit(index: number) {
    // @ts-ignore
    const status2: Status = {content: this.createForm.value.content, status: this.createForm.value.status}
    this.statusService.editStatus(index, status2).subscribe(() => {
      this.editPicture(index);
      this.idS = -1;
      this.listPicture = [];
      this.resetForm();
      this.view();
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

  uploadFileImg(): void {
    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    if (this.selectedImage == undefined) {
      // @ts-ignore
      this.selectedImage = this.avatarDom1.nativeElement.files[0]
    }
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
        this.listPicture.push(image);
        console.log(this.listPicture);
      })))).subscribe((data) => {
      });
    }
  }

  showImg(index: number) {
    this.imageService.findByStatusId(index).subscribe((data) => {
      this.listPicture = data[0];
      console.log(this.listPicture);
    })
  }

  // @ts-ignore
  savePicture(): void {
    this.imageService.saveImage(this.listPicture).subscribe((data) => {
      console.log(data);
      console.log(this.listPicture);
      this.listPicture = [];
    });
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

// tao comment

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
      this.mainView();
    })

  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data)=> {
      this.view();
      this.mainView();
    }                                                                                                           )
  }

  findCommentByStatusId(id: number) {
    this.commentService.findCommentByStatusId(id).subscribe((data)=> {
      this.listComment = data;
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

  resetForm() {
    this.createForm.patchValue({content: "", status: "1"});
  }

  resetmodal(): void {
    this.listPicture = [];
    this.resetForm();
  }
}
