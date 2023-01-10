import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageMainComponent} from "./page/page-main/page-main.component";
import {PageProfileComponent} from "./page/page-profile/page-profile.component";
<<<<<<< HEAD
// import {SigninSignupComponent} from "./page/signin-signup/signin-signup.component";
import {ProfileComponent} from "./friends/profile/profile.component";
=======
>>>>>>> origin/Son
import {LoginComponent} from "./page/signin-signup/login/login.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";

const routes: Routes = [
  {path: 'main',component: PageMainComponent},
  {path: 'profile', component: PageProfileComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
<<<<<<< HEAD
  {path: 'showProfile', component: ProfileComponent}
=======
  {path: '', component: LoginComponent}
>>>>>>> origin/Son
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
