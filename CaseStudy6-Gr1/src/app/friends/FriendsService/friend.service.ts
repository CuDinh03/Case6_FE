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
  name !:string;
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
getMutualFriend(id1:number,id2:number) :Observable<Friend[]>{
    return this.http.get<Friend[]>("http://localhost:8080/mutualfriend/"+id1+"/"+id2)
}
  getAllFriends1(id: number) :Observable<Friend[]>{
    return this.http.get<Friend[]>("http://localhost:8080/"+id);
  }
  findFriend(name:string){
    this.http.get<Friend[]>("http://localhost:8080/")
  }

  removeFriend(id1:number,id2:number){
    this.http.delete("http://localhost:8080/delete/"+id1+"/"+id2).subscribe((data)=>{
    });
  }
  addFriend(id1:number,id2:number){
    this.http.post("http://localhost:8080/addFriend/"+ id1 + "/" +id2,"").subscribe((data)=>{
    });
  }
removeRequest(id1:number,id2:number){
    this.http.delete("http://localhost:8080/deleteRequest/"+id1 + "/" +id2).subscribe((data)=>{})
}


}
