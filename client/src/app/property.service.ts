// property.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private readonly apiUrl = 'http://127.0.0.1:5000/api/properties'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }
}
