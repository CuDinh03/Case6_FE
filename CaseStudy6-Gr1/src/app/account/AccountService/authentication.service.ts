// import {EventEmitter, Injectable} from '@angular/core';
// import {environment} from "../../environments/environment";
// import {BehaviorSubject, map, Observable} from "rxjs";
// import {HttpClient} from "@angular/common/http";
// import {UserToken} from "../../model/user-token";
// import {User} from "../../model/user";
//
//
// const API_URL = environment.apiUrl;
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticationService {
//   private currentUserSubject: BehaviorSubject<UserToken>;
//   public currentUser: Observable<UserToken>
//   update = new EventEmitter<string>();
//   constructor(private httpClient : HttpClient) {
//     this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<string>localStorage.getItem('currentUser')));
//     this.currentUser = this.currentUserSubject.asObservable();
//   }
//
//   public get currentUserValue() : UserToken {
//     return this.currentUserSubject.value;
//   }
//
//   login(userName: string, password: string) {
//     return this.httpClient.post<any>(API_URL + 'login', {userName, password})
//       .pipe(map(account => {localStorage.setItem('currentUser', JSON.stringify(account));
//         this.currentUserSubject.next(account);
//         return account;
//       }));
//   }
//
//   logout() {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('USERNAME');
//     localStorage.removeItem('ROLE');
//     localStorage.removeItem('ACCESS_TOKEN');
//     localStorage.removeItem('ID');
//     localStorage.removeItem('FULLNAME');
//   }
//
//   register(user: User): Observable<User> {
//     return this.httpClient.post<User>(API_URL + 'register', user);
//   }
// }
