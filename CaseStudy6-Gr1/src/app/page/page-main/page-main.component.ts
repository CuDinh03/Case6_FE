import {asNativeElements, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Status} from "../../model/status";
import {Friend} from "../../model/friend";
import {FriendService} from "../../friends/FriendsService/friend.service";
import {AuthenticationService} from "../../account/AccountService/authentication.service";
import {FileUploadService} from "../../service/file-upload.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import * as url from "url";
import {finalize} from "rxjs";

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

  shortLink: string = "";
  loading: boolean = false;
  file!: File;

  selectedImage: any;
  @ViewChild('uploadFile', {static: true})public avatarDom: ElementRef | undefined;
  arrayPicture = "";
  listPicture: string[] = [];

  friendList !: Friend[];
  friendInF!: Friend;


  constructor(private storage: AngularFireStorage, private fileUploadService: FileUploadService, public friendService: FriendService, private router: Router, private statusService: StatusService, private authenticationService: AuthenticationService) {
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
    this.friendService.listRequest(this.userToken.id).subscribe((data1) => {
      this.listSent=data1;
    })
  }
  requestReceived(){
    this.friendService.listReceived(this.userToken.id).subscribe((data2)=>{
      this.listReceived=data2
    })
  }


  // // On file Select
  // onChange(event: any) {
  //   this.file = event.target.files[0];
  // }
  //
  // // OnClick of button Upload
  // onUpload() {
  //   this.loading = !this.loading;
  //   console.log(this.file);
  //   this.fileUploadService.upload(this.file).subscribe(
  //     (event: any) => {
  //       if (typeof (event) === 'object') {
  //
  //         // Short link via api response
  //         this.shortLink = event.link;
  //
  //         this.loading = false; // Flag variable
  //       }
  //     }
  //   );
  // }

  uploadFileImg(): void {

    this.selectedImage = this.avatarDom?.nativeElement.files[0];
    this.submit();

}

submit(): void {
    if (this.selectedImage != null) {
      const filePath = this.selectedImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(finalize
      (()=>(fileRef.getDownloadURL().subscribe(url =>{this.listPicture.push(url);
        console.log(this.arrayPicture);
      })))).subscribe();
}
}

}
