import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import {img} from "../model/img";


const API_URL = `http://localhost:8080`;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  saveImage(img: any): Observable<any> {
    return this.http.post<img>(API_URL + '/img', img);
  }
}
