import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {Router} from "@angular/router";
import {LoginService} from "../../../account/AccountService/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  checkStatus! : number;
userToken: any;
  constructor(private loginService: LoginService, private router: Router) {

  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    userName: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  login() {
    this.loginService.login(this.loginForm.value).subscribe((data) => {
      this.checkStatus = data[0];
      this.userToken = data[1];
        if (data[0] == 1 ) {
          this.loginService.setUserToken(data[1]);
          this.loginService.setToken(data[1].token);
          this.router.navigate(["/main"])
        }
      }
    )
  }
}
