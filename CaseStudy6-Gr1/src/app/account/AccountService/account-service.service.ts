import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../model/account";
import {AccountToken} from "../../model/account-token";
const API_URL = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {


  constructor(private http: HttpClient) {
  }

  // login(account: any): Observable<AccountToken>{
  //   return this.http.post<AccountToken>("http://localhost:8080/login",account);
  // }
  //
  // register(account: any): Observable<any>{
  //   return this.http.post<any>("http://localhost:8080/register",account);
  // }

  getUserProfile(id: number): Observable<Account> {
    return this.http.get<Account>(API_URL + `users/${id}`);
  }

  updateUserProfile(id: number, user: Account): Observable<Account> {
    return this.http.put<Account>(API_URL + `users/${id}`, user);
  }

  updatePassword(id: number, user: Account, currentPassword: string): Observable<Account> {
    return this.http.put<Account>(API_URL + `users/change-password/${id}?currentPassword=` + currentPassword, user);
  }

  updateAvatar(id: any, user: Account): Observable<Account> {
    return this.http.put<Account>(API_URL + `users/change-avatar/${id}`, user)
  }
}
