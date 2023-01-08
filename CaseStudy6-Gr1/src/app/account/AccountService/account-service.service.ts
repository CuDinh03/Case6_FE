// import { Injectable } from '@angular/core';
// import {environment} from "../../environments/environment";
// import {HttpClient} from "@angular/common/http";
// import {Observable} from "rxjs";
// import {UserToken} from "../../model/user-token";
// import {User} from "../../model/user";
//
// const API_URL = environment.apiUrl;
// @Injectable({
//   providedIn: 'root'
// })
// export class AccountServiceService {
//
//
//   constructor(private http: HttpClient) {
//   }
//   //
//   // login(user: any): Observable<UserToken>{
//   //   return this.http.post<UserToken>("http://localhost:8080/login",user);
//   // }
//   // //
//   // // register(account: any): Observable<any>{
//   // //   return this.http.post<any>("http://localhost:8080/register",account);
//   // // }
//
//   getUserProfile(id: number): Observable<User> {
//     return this.http.get<User>(API_URL + `users/${id}`);
//   }
//
//   updateUserProfile(id: number, user: User): Observable<User> {
//     return this.http.put<User>(API_URL + `users/${id}`, user);
//   }
//
//   updatePassword(id: number, user: User, currentPassword: string): Observable<User> {
//     return this.http.put<User>(API_URL + `users/change-password/${id}?currentPassword=` + currentPassword, user);
//   }
//
//   updateAvatar(id: any, user: User): Observable<User> {
//     return this.http.put<User>(API_URL + `users/change-avatar/${id}`, user)
//   }
// }
