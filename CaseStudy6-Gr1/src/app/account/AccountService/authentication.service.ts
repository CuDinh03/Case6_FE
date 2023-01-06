import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {BehaviorSubject, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AccountToken} from "../../model/account-token";
import {Account} from "../../model/account";

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<AccountToken>;
  public currentUser: Observable<AccountToken>
  update = new EventEmitter<string>();
  constructor(private httpClient : HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AccountToken>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() : AccountToken {
    return this.currentUserSubject.value;
  }

  login(userName: string, password: string) {
    return this.httpClient.post<any>(API_URL + 'login', {userName, password})
      .pipe(map(account => {localStorage.setItem('currentUser', JSON.stringify(account));
        this.currentUserSubject.next(account);
        return account;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('USERNAME');
    localStorage.removeItem('ROLE');
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('ID');
    localStorage.removeItem('FULLNAME');
  }

  register(account: Account): Observable<Account> {
    return this.httpClient.post<Account>(API_URL + 'register', account);
  }
}
