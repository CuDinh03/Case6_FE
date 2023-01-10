import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UserToken} from "../model/user-token";
import {LoginService} from "../account/AccountService/user.service";
import {Observable} from "rxjs";
// import {AuthenticationService} from "../account/AccountService/authentication.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService,public router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userToken = this.loginService.getUserToken();
    for (const role of userToken?.roles) {
      if (role.name == "ROLE_USER") {
        return true;
      }
    }
    this.router.navigate([""])
    return false;
  }

}
