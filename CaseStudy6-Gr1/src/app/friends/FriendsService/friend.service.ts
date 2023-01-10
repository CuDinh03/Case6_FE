import {Injectable, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Friend} from "../../model/friend";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FriendService{

  fiendList!:Friend[];
  idInf!:number;
  name!:string;
userToken : any;
  constructor( private http:HttpClient) { }

  ngOnInit(): void {

    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));

    this.getAllFriends();

  }

  getAllFriends() :Observable<Friend[]>{
  return this.http.get<Friend[]>("http://localhost:8080/profile/" + this.userToken.id);
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
