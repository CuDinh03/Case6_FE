import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {AdminService} from "../../account/Admin/admin.service";
import {Account} from "../../model/account";


@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {
  idToBlock!:number;
  listAccount: any;
  check!:number;
  // accounts: a;
  status!: any;
  p: any;
  page: any;
  constructor(private router: Router, private statusService: StatusService, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe((data) => {
      this.listAccount = data;
    })
      // this.adminService.getAllPage(this.page).subscribe((data) => {
      //   this.accounts = data
      // })
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
}
