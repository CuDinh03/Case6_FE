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

  constructor(private http: HttpClient) { }

  saveImage(img: any): Observable<any> {
    return this.http.post<img>(`${API_URL}/images`, img);
  }

  findByStatusId(id: number): Observable<any> {
    return this.http.get<img[]>(`${API_URL}/images/${id}`);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete<img>(`${API_URL}/images/${id}`);
  }

  editPicture(id: number, listPicture: img[]): Observable<any>{
    return this.http.put<any>(`${API_URL}/statuses/${id}`, listPicture);
  }
}
