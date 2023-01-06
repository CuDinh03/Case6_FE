import {Component, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../model/status";
import {environment} from "../environments/environments";
const API_URL = `${environment.apiUrl}`;
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) {
  }
  getAll(): Observable<Status[]>{
    return this.http.get<Status[]>(API_URL+'/status');
  }
  saveStatus(status: any): Observable<Status> {
    return this.http.post<Status>(API_URL + '/status', status);
  }

  findById(id: number): Observable<Status> {
    console.log(this.http.get<Status>(`${API_URL}/status/${id}`))
    return this.http.get<Status>(`${API_URL}/status/${id}`);
  }
  updateStatus(id: number, status: Status): Observable<Status>{
    return this.http.put<Status>(`${API_URL}/status/${id}`, status);
  }
  deleteStatus(id: number): Observable<Status> {
    return this.http.delete<Status>(`${API_URL}/status/${id}`);
  }
}
