import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {LoginService} from "../../../account/AccountService/user.service";
import {AuthenticationService} from "../../../account/AccountService/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private authenticationService : AuthenticationService) {
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  login() {
    this.loginService.login(this.loginForm.value).subscribe((data) => {
      this.loginService.setUserToken(data);
      this.loginService.setToken(data.accessToken);
      this.router.navigate(["/main"])
    })
  }
  logout(){
    this.authenticationService.logout();
  }
}
