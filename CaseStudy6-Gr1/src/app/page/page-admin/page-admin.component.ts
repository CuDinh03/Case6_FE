import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {StatusService} from "../../service/status.service";
import {AdminService} from "../../account/Admin/admin.service";
import {Account} from "../../model/account";
import {Friend} from "../../model/friend";

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.css']
})
export class PageAdminComponent implements OnInit {

  listAccount: any;
  constructor(private router: Router, private statusService: StatusService, private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminService.getAllUser().subscribe((data) => {
      this.listAccount = data;
    })
  }
}
