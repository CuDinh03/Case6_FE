
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserToken} from "../../model/user-token";
import {ChangePassword} from "../../model/changePassword";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(user: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/login",user);
  }

  register(account: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/register",account);
  }

  changePassword(changePassword: any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/changepassword",changePassword);
  }

  setToken(token: string){
    localStorage.setItem("token",token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  setUserToken(userToken: UserToken){
    localStorage.setItem("userToken",JSON.stringify(userToken));
  }

  getUserToken(): UserToken{
    return JSON.parse(<string>localStorage.getItem("userToken"));
  }
}
