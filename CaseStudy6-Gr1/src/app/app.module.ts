import {EnvironmentInjector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninSignupComponent } from './page/signin-signup/signin-signup.component';
import { PageMainComponent } from './page/page-main/page-main.component';
import { PageProfileComponent } from './page/page-profile/page-profile.component';
import { StatusService } from './service/status.service';

@NgModule({
  declarations: [
    AppComponent,
    SigninSignupComponent,
    PageMainComponent,
    PageProfileComponent,
    StatusService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
