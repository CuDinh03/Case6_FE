import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Likes} from "../model/likes";
import {HttpClient} from "@angular/common/http";

const API_URL = `http://localhost:8080`;


@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) { }
  saveLikes(likes: any, id: number): Observable<any>{
    return this.http.post<Likes[]>(`${API_URL}/likes/${id}`,likes)
  }

  findLikesByStatusId(id:number): Observable<any>{
    return this.http.get<Likes[]>(`${API_URL}/likes/${id}`)
  }
}
