import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserToken} from "../model/user-token";
import {LoginService} from "../account/AccountService/user.service";
// import {AuthenticationService} from "../account/AccountService/authentication.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  currentUser: any;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    // this.loginService.currentUser.subscribe(
    //   currentUser => {
    //     this.currentUser = currentUser;
    //   }
    // );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!!this.currentUser) {
      return true;
    } else {
      this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
