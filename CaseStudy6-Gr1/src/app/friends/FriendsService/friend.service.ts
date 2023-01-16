import {Injectable, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Friend} from "../../model/friend";
import {HttpClient} from "@angular/common/http";
import {Account} from "../../model/account";
import {Acc} from "../../model/acc";

@Injectable({
  providedIn: 'root'
})
export class FriendService implements  OnInit{
   sttFriend!:number;
  idInf!:number;
  name !:string;
  userToken!:any;


  constructor( private  http: HttpClient) { }

  ngOnInit(): void {
    // @ts-ignore
    this.userToken = JSON.parse(localStorage.getItem("userToken"));
   this.listReceived(this.userToken.id);
   this.listRequest(this.userToken.id);
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
  findFriend(name:string):Observable<Friend[]>{
   return  this.http.get<Friend[]>("http://localhost:8080/find/"+name);
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
    this.http.delete("http://localhost:8080/deleteRequest/"+id1 +"/" +id2).subscribe((data)=>{})
}
listRequest(id:number):Observable<Friend[]>{
   return this.http.get<Friend[]>("http://localhost:8080/sent/"+id);
}
listReceived(id:number):Observable<Friend[]>{
    return this.http.get<Friend[]>("http://localhost:8080/received/"+id);
}
isFriend(id1:number,id2:number){
    return  this.http.get<number>("http://localhost:8080/isFriends/"+id1+"/"+id2)
}
acceptRequest(id1:number,id2:number){
    return this.http.post("http://localhost:8080/acceptRequest/"+id1+"/" +id2,"").subscribe((data)=>{})
}
findByUserName(name:string):Observable<Friend>{
    return this.http.get<Friend>("http://localhost:8080/profile/"+name);
}
removeRequestReceived(id1:number,id2:number){
return this.http.delete("http://localhost:8080/deleteRequest/"+id2+"/"+id1).subscribe((data)=>{})
 }
 getAccountByID(id:number):Observable<Friend>{
   return  this.http.get<Friend>("http://localhost:8080/account/"+id);
 }
 updateAccount(account:Acc){
    return this.http.put("http://localhost:8080/update",account).subscribe((data)=>{})
 }
}
