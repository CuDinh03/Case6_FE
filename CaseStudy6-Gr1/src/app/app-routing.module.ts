import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from './friends/profile/profile.component';

import {PageMainComponent} from "./page/page-main/page-main.component";
import {PageProfileComponent} from "./page/profile-duc/page-profile.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";
import {LoginComponent} from "./page/signin-signup/login/login.component";

const routes: Routes = [
  {path: 'main',component: PageMainComponent},
  {path: 'profile', component: PageProfileComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'showProfile',component:ProfileComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }

}
