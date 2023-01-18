import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";

const API_URL = `http://localhost:8080`;

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) {
  }

  findAll(userId: any): Observable<any>{
    return this.http.get<Status[]>(API_URL+'/statuses?userId=' + userId);
  }

  findByAccountId(id: number): Observable<any> {
    return this.http.get<Status[]>(`${API_URL}/statuses/${id}`);
  }

  saveStatus(status: any): Observable<Status> {
    return this.http.post<Status>(API_URL + '/statuses', status);
  }

  findById(id: number): Observable<any> {
    return this.http.get<Status>(`${API_URL}/statuses/one/${id}`);
  }

  editStatus(id: number, status: Status): Observable<Status>{
    return this.http.put<Status>(`${API_URL}/statuses/${id}`, status);
  }

  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`${API_URL}/statuses/${id}`);
  }

  showMystatus (id:number, anyt: String): Observable<any>{
    return this.http.get<Status[]> (`${API_URL}/statuses/search/${id}/${anyt}`);
  }

  findAllByGuestId(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/statuses/guest/${id}`);
  }
}
