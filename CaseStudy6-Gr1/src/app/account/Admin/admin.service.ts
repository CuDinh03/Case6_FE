import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../model/account";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<Account> {
    return this.http.get<Account>("http://localhost:8080/users");
  }

  disableUser(id: number):Observable<Account> {
    return  this.http.put<Account>("http://localhost:8080/block-user/{id}", id)

  }
}
