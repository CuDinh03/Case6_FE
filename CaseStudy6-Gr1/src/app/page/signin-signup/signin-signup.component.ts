import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../account/AccountService/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-signin-signup',
  templateUrl: './signin-signup.component.html',
  styleUrls: ['./signin-signup.component.css']
})
export class SigninSignupComponent implements OnInit{

  checkDuplicateMail: boolean = true
  checkDuplicateUsername: boolean = true

  constructor(private loginService: LoginService, private router: Router) {
  }
  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    confirmPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    phoneNumber: new FormControl("", [Validators.required, Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    birthday: new FormControl('', [Validators.required]),
    fistName: new FormControl('',Validators.nullValidator),
    lastName: new FormControl('',Validators.nullValidator),
    address: new FormControl('',Validators.nullValidator),
    gender: new FormControl('',Validators.nullValidator),

  })

  register() {
    this.loginService.register(this.registerForm.value).subscribe((data) => {

      this.checkDuplicateUsername = data[0];
      this.checkDuplicateMail = data[1];
      if (data[0] && data[1]) {
        this.message()
        this.router.navigate(["/login"])
      }
    });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Register account success ',
      showConfirmButton: false,
      timer: 1500
    })
  }

  checkConfirmPassword() {

    if (this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value) {
      // @ts-ignore
      document.getElementById("abc").style.display = "block";
    } else {
      // @ts-ignore
      document.getElementById("abc").style.display = "none";
    }
  }

  loginForm = new FormGroup({
    userName: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  login(){
    this.loginService.login(this.loginForm.value).subscribe((data)=>{
      this.loginService.setUserToken(data);
      this.loginService.setToken(data.accessToken);
      this.router.navigate(["/main"])
    })
  }


}
