import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageMainComponent } from './page/page-main/page-main.component';
import { PageProfileComponent } from './page/page-profile/page-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/jwt-interceptor";
import {LoginComponent} from "./page/signin-signup/login/login.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";
import {ProfileComponent} from "./friends/profile/profile.component";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import { PageSearchComponent } from './page/page-search/page-search.component';



@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    PageProfileComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PageSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({apiKey: "AIzaSyDRvLQk6dtDxTyWNAIy_cudcAf0l5gTvk4",
      authDomain: "mangxh-2da99.firebaseapp.com",
      databaseURL: "https://mangxh-2da99-default-rtdb.firebaseio.com/",
      projectId: "mangxh-2da99",
      storageBucket: "mangxh-2da99.appspot.com",
      messagingSenderId: "882928206491",
      appId: "1:882928206491:web:4d77fe9c97e5cf44167c3e",
      measurementId: "G-VY9ZQZVR13"}),



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
