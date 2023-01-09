import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserToken} from "../../model/user-token";
import {User} from "../../model/user";


const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserToken>;
  public currentUser: Observable<UserToken>
  update = new EventEmitter<string>();
  constructor(private httpClient : HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  logout() {
    localStorage.clear();
  }

}
