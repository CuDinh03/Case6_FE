import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageMainComponent} from './page/page-main/page-main.component';
import {PageProfileComponent} from './page/page-profile/page-profile.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./auth/jwt-interceptor";
import {LoginComponent} from "./page/signin-signup/login/login.component";
import {RegisterComponent} from "./page/signin-signup/register/register.component";
import {ProfileComponent} from "./friends/profile/profile.component";
import {ChangePasswordComponent} from "./page/change-password/change-password.component";
import {PageAdminComponent} from './page/page-admin/page-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {environment} from "./environments/environment";
import {PageSearchComponent} from './page/page-search/page-search.component';
import {GuestProfileComponent} from './friends/guest-profile/guest-profile.component';
import {SearchStatusComponent} from './page/search-status/search-status.component';


NgxPaginationModule

@NgModule({
  declarations: [
    AppComponent,
    PageMainComponent,
    PageProfileComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ChangePasswordComponent,
    PageAdminComponent,
    ProfileComponent,
    PageSearchComponent,
    GuestProfileComponent,
    SearchStatusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '505450593389-2qkj1fmitg64m51m39od6fp1om3nuao9.apps.googleusercontent.com'
    //         )
    //       }
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    // //   } as SocialAuthServiceConfig,
    // }


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
