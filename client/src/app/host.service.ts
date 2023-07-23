import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private baseUrl = 'http://localhost:5000/api/properties';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<any> {
    return this.http.get<any[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  createProperty(property: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, property).pipe(catchError(this.handleError));
  }

  updateProperty(property: any): Observable<any> {
    const url = `${this.baseUrl}/${property.id}`;
    return this.http.put<any>(url, property).pipe(catchError(this.handleError));
  }

  deleteProperty(propertyId: string): Observable<any> {
    const url = `${this.baseUrl}/${propertyId}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('HostService error:', error);
    throw error;
  }
}
