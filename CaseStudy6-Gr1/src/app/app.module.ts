import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageMainComponent } from './page/page-main/page-main.component';
import { PageProfileComponent } from './page/page-profile/page-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/jwt-interceptor";
import {LoginComponent} from "./page/signin-signup/login/login.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";
import {ProfileComponent} from "./friends/profile/profile.component";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "./environments/environment";
import { PageSearchComponent } from './page/page-search/page-search.component';
import { GuestProfileComponent } from './friends/guest-profile/guest-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    PageProfileComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PageSearchComponent,
    GuestProfileComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        FormsModule
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
