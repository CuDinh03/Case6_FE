import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {LoginService} from "../../../account/AccountService/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  ngOnInit(): void {
  }

  checkExistPassword: boolean = true;

  constructor(private loginService: LoginService, private router: Router) {
  }

  changePasswordForm  = new FormGroup({
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      // confirmNewPassword: new FormControl("", [Validators.required]),
    })

  editPassword() {
    console.log("ok2")
    this.loginService.changePassword(this.changePasswordForm.value).subscribe(data => {
      alert("12321321");
      this.router.navigate(["/main"])
      if (data) {
        alert("ok1")
        this.checkExistPassword = true;
        this.messagePassSuccess();
        this.router.navigate(["/profile"])
      } else {
        alert("ok3")
        this.checkExistPassword = false;
        this.messagePassFail()
        this.router.navigate(["/change-password"])
      }
    })
  }

  checkConfirmPassword() {

    if (this.changePasswordForm.get('newPassword')?.value != this.changePasswordForm.get('confirmNewPassword')?.value) {
      // @ts-ignore
      document.getElementById("abc").style.display = "block";
    } else {
      // @ts-ignore
      document.getElementById("abc").style.display = "none";
    }
  }

  messageEditAvatar() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edit Avatar successful!',
      showConfirmButton: false,
      timer: 2500
    })
    window.location.reload()
  }

  messageEditProFail() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Change profile fail ',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messagePassSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Change password succes !',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messagePassFail() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Change password fail ! ',
      showConfirmButton: false,
      timer: 1500
    })

  }


}
