import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {img} from "../model/img";
import {Status} from "../model/status";


const API_URL = `http://localhost:8080`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  saveImage(img: any): Observable<any> {
    return this.http.post<img>(API_URL + '/images', img);
  }

  findByStatusId(id: number): Observable<any> {
    return this.http.get<img[]>(`${API_URL}/images/${id}`);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete<img>(`${API_URL}/images/${id}`);
  }

  editPicture(id: number, status: Status): Observable<Status>{
    return this.http.put<Status>(`${API_URL}/statuses/${id}`, status);
  }

  findLastPicture(): Observable<img> {
    return this.http.get<img>(`${API_URL}/images`);
  }

  saveone(img: any): Observable<any> {
    return this.http.post<any>(`${API_URL}/images/one`, img)
  }
}
