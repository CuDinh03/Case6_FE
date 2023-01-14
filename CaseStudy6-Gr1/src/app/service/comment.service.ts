import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {comment} from "../model/comment";
import {Status} from "../model/status";
import {Comment} from "@angular/compiler";


const API_URL = `http://localhost:8080`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private  http: HttpClient) { }

  saveComment(comment: any): Observable<any>{
    return this.http.post<comment>(API_URL+ '/comments', comment)
  }

  findCommentByStatusId(id:number): Observable<any>{
    return this.http.get<comment[]>(`${API_URL}/comments/${id}`)
  }

}