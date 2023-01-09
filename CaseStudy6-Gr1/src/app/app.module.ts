import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninSignupComponent } from './page/signin-signup/signin-signup.component';
import { PageMainComponent } from './page/page-main/page-main.component';
import { PageProfileComponent } from './page/page-profile/page-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './status/create/create.component';
import { DeleteComponent } from './status/delete/delete.component';
import { EditComponent } from './status/edit/edit.component';
import { ShowComponent } from './status/show/show.component';
import { ViewComponent } from './status/view/view.component';
import {ReactiveFormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    SigninSignupComponent,
    PageMainComponent,
    PageProfileComponent,
    CreateComponent,
    DeleteComponent,
    EditComponent,
    ShowComponent,
    ViewComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
