import {Injectable, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Friend} from "../../model/friend";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendService implements  OnInit{

  fiendList!:Friend[];
  idInf!:number;

  constructor( private  http: HttpClient) { }

  ngOnInit(): void {
    this.getAllFriends();
  }
  getAllFriends() :Observable<Friend[]>{
  return this.http.get<Friend[]>("http://localhost:8080/1");
}
getInFor(id:number) :Observable<Friend>{
    return this.http.get<Friend>("http://localhost:8080/profileId/"+id);
}


}
