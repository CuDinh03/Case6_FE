// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import {environment} from "../../environments/environment";
// import {Observable} from "rxjs";
// import {User} from "../../model/user";
//
// const API_URL = environment.apiUrl;
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//
//   constructor(private http : HttpClient) { }
//
//   getUserProfile(id: number): Observable<User> {
//     return this.http.get<User>(API_URL + `users/${id}`);
//   }
//
//   updateUserProfile(id: number, user: User): Observable<User> {
//     return this.http.put<User>(API_URL + `users/${id}`, user);
//   }
//
//   updatePassword(id : number, user: User,currentPassword : string): Observable<User> {
//     return this.http.put<User>(API_URL + `users/change-password/${id}?currentPassword=`+ currentPassword, user);
//   }
//
//   updateAvatar(id : any,user : User) : Observable<User>{
//     return this.http.put<User>(API_URL + `users/change-avatar/${id}`,user)
//   }
//
//
// }
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

  login(user: any): Observable<UserToken>{
    return this.http.post<UserToken>("http://localhost:8080/login",user);
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
