import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {PageMainComponent} from './page/page-main/page-main.component';
import {PageProfileComponent} from './page/profile-duc/page-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";


import {AuthInterceptor} from "./auth/jwt-interceptor";
import {ProfileComponent} from "./friends/profile/profile.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";
import {LoginComponent} from "./page/signin-signup/login/login.component";


@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    PageProfileComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
