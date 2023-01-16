import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../../model/account";
import {Page} from "../../model/Page";
import {environment} from "../../environments/environment";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAllUser(): Observable<Account> {
    return this.http.get<Account>("http://localhost:8080/users");
  }

  disableUser(id: number):Observable<any> {
    return  this.http.put<any>("http://localhost:8080/disableUser/"+id, id)
  }
  undisableUser(id: number):Observable<any> {
    return  this.http.put<any>("http://localhost:8080/undisableUser/"+id,id)
  }

  getAllPage(page:any):Observable<Page> {
    return this.http.get<Page>(API_URL + '/users/'+page);
  }
}
