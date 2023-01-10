import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../account/AccountService/authentication.service";

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.css']
})
export class PageMainComponent {
  constructor(private router: Router,  private authenticationService : AuthenticationService) {
  }

  mainView(){
    this.router.navigate(['/main'])
  }
  profileView(){
    this.router.navigate(['/profile'])
  }

  modalView(){
    this.router.navigate(['/modal'])
  }

  showComment(){
    let cmt = document.getElementById('o-hide')

  }
  logout(){
    this.authenticationService.logout()
  }
}
