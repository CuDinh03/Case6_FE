import {Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Friend} from "../../model/friend";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendService implements  OnInit {

  constructor( private  http: HttpClient) { }

  ngOnInit(): void {
    this.getAllFriends();
  }
  getAllFriends() :Observable<Friend[]>{
  return this.http.get<Friend[]>("http://localhost:8080/1")
}
}
