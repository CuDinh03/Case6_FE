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
  name!:string;
  idToFind!:number;
  userToken!:any;


  constructor( private  http: HttpClient) { }

  ngOnInit(): void {

  }
  getAllFriends(id:number) :Observable<Friend[]>{
  return this.http.get<Friend[]>("http://localhost:8080/"+id);
}
getInFor(id:number) :Observable<Friend>{
    return this.http.get<Friend>("http://localhost:8080/profileId/"+id);
}
getMutualFriend(id:number) :Observable<Friend[]>{
    return this.http.get<Friend[]>("http://localhost:8080/mutualfriend/1/"+id)
}
  getAllFriends1(id: number) :Observable<Friend[]>{
    return this.http.get<Friend[]>("http://localhost:8080/"+id);
  }
  findFriend(name:string){
    this.http.get<Friend[]>("http://localhost:8080/")
  }



}
