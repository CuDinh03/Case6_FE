import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from 'src/app/account/AccountService/authentication.service';
import {Account} from "../../../model/account";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  ngOnInit(): void {
    // @ts-ignore
    document.getElementById("datePickerId").max = new Date().toISOString().split("T")[0];
  }

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    status: new FormControl(),
    role: new FormControl(),
    fistName: new FormControl(),
    lastName: new FormControl(),
    address: new FormControl(),
    gender: new FormControl(),
    img: new FormControl(),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("(03|05|07|08|09)+([0-9]{8})")]),
    birthday: new FormControl('', [Validators.required])
  });

  get userName() {
    return this.registerForm.get('userName')
  }

  get password() {
    return this.registerForm.get('password')
  }


  get email() {
    return this.registerForm.get('email')
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber')
  }

  get birthday() {
    return this.registerForm.get('birthday')
  }

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }


  register() {
    const account = this.setNewUser();
    this.authenticationService.register(account).subscribe((data) => {
      // this.toast.success({detail: "Thông Báo", summary: "Đăng ký thành công", duration: 3000})
      this.router.navigate(['/login']);
      this.registerForm.reset();
    }, err => {
      if (err.error == "Tên người dùng đã tồn tại") {
        // @ts-ignore
        document.getElementById("check-username").style.display = "block"
      }
      if (err.error == "Email đã tồn tại") {
        // @ts-ignore
        document.getElementById("check-email").style.display = "block"
      }
      console.log(err.error);
    });
    console.log(account);
  }

  private setNewUser() {
    // @ts-ignore
    const account: Account = {
      userName: this.registerForm.value.userName,
      password: this.registerForm.value.password,
      email: this.registerForm.value.email,
      phoneNumber: this.registerForm.value.phoneNumber,
      birthday: this.registerForm.value.birthday,
      status: this.registerForm.value.status,
      role: this.registerForm.value.role,
      fistName: this.registerForm.value.fistName,
      lastName: this.registerForm.value.lastName,
      address: this.registerForm.value.address,
      gender:this.registerForm.value.gender,
      img: this.registerForm.value.img,
    };
    return account;
  }

  // checkConfirmPassword() {
  //   if (this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value) {
  //     // @ts-ignore
  //     document.getElementById("abc").style.display = "block";
  //   }
  // }
}
