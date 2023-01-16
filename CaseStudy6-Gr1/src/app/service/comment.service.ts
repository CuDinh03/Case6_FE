import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {comment} from "../model/comment";



const API_URL = `http://localhost:8080`;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private  http: HttpClient) { }

  saveComment(comment: any, id: number): Observable<any>{
    return this.http.post<comment>(`${API_URL}/comments/${id}`, comment)
  }

  findCommentByStatusId(id:number): Observable<any>{
    return this.http.get<comment[]>(`${API_URL}/comments/${id}`)
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any>(`${API_URL}/comments/${id}`)
  }
}
