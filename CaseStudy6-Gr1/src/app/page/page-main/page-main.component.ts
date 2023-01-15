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

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent implements OnInit {
  statuses: Status[] = [];
  listFound!: Friend[];
  listSent!: Friend[];
  listReceived!: Friend[];
  status1: any;
  statusE!: Status;
  userToken: any;
  idS!: number;
  img: any;

  selectedImage: any;
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;
  listPicture: img[] = [];


  friendList !: Friend[];
  friendInF!: Friend;


  constructor(private storage: AngularFireStorage,
              private fileUploadService: FileUploadService,
              public friendService: FriendService,
              private router: Router,
              private statusService: StatusService,
              private authenticationService: AuthenticationService,
              private imageService: ImageService) {
  }

  view(): void {
    this.statusService.findAll(this.userToken.id).subscribe((data) => {
      this.statuses = data[0];
      console.log(this.statuses);
      this.img = data[0][0].img;
      console.log(this.img);
    })
  }

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
    this.view();
    this.friendService.userToken = this.userToken;
    this.requestSent();
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
      this.savePicture();
      this.createForm.reset();
      this.view();
      this.mainView()
    })
  }

  showEdtit(index: number) {
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
    console.log(status2);
    this.statusService.editStatus(index, status2).subscribe(() => {
      this.editPicture(this.idS);
      this.idS = -1;
      this.createForm.reset();
      this.listPicture = [];
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
    this.submit();
  }

  submit(): void {
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize
      (() => (fileRef.getDownloadURL().subscribe(url => {
        console.log(url);
        let image: img = {id: 0, name: ""};
        image.name = url;
        this.listPicture.push(image);
        console.log(this.listPicture);
      })))).subscribe();
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

  deletePicture(index: number): void {
    this.listPicture.splice(index, 1);
    console.log(this.listPicture);
    this.imageService.deleteImage(index).subscribe((data) => {
      this.createForm.reset();
      this.listPicture = [];
      this.view();
      this.mainView();
    })
  }

  editPicture(index: number): void {}

  resetmodal(): void {
    this.listPicture = [];
    this.createForm.reset();
  }


}
