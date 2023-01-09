import { NgModule } from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { ProfileComponent } from './friends/profile/profile.component';

import {PageMainComponent} from "./page/page-main/page-main.component";
import {PageProfileComponent} from "./page/page-profile/page-profile.component";
import {SigninSignupComponent} from "./page/signin-signup/signin-signup.component";

const routes: Routes = [
  {path: 'main',component: PageMainComponent},
  {path: 'profile', component: PageProfileComponent},
  {path: '', component: SigninSignupComponent},
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
