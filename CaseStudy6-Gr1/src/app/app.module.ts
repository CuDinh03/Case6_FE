import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
// import { SigninSignupComponent } from './page/signin-signup/signin-signup.component';
=======
>>>>>>> origin/Son
import { PageMainComponent } from './page/page-main/page-main.component';
import { PageProfileComponent } from './page/page-profile/page-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/jwt-interceptor";
import {LoginComponent} from "./page/signin-signup/login/login.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    // SigninSignupComponent,
=======
>>>>>>> origin/Son
    PageMainComponent,
    PageProfileComponent,
    LoginComponent,
    RegisterComponent,

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
export class AppModule { }
