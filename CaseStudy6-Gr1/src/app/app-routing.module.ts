import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageMainComponent} from "./page/page-main/page-main.component";
import {PageProfileComponent} from "./page/page-profile/page-profile.component";
// import {SigninSignupComponent} from "./page/signin-signup/signin-signup.component";
import {ProfileComponent} from "./friends/profile/profile.component";
import {LoginComponent} from "./page/signin-signup/login/login.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";
import {PageSearchComponent} from "./page/page-search/page-search.component";
import {AuthGuard} from "./auth/auth-guard";
import {GuestProfileComponent} from "./friends/guest-profile/guest-profile.component";
import * as path from "path";


const routes: Routes = [
  {path: 'main',component: PageMainComponent},
  {path: 'profile', component: PageProfileComponent},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'showProfile/:smty', component: ProfileComponent},
  {path: 'search/:smt', component: PageSearchComponent},
  {path:'guest/:smt', component:GuestProfileComponent},
  {path:'search/listSent', component: PageSearchComponent},
  {path:'search/listReceived', component: PageSearchComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
