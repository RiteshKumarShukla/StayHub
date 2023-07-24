import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private baseUrl = 'https://stayhub-backend.onrender.com/api/properties'; // Update this URL if your backend URL is different

  constructor(private http: HttpClient) { }

  getAllProperties(
    page: number,
    perPage: number,
    titleFilter: string,
    propertyTypeFilter: string,
    locationFilter: string
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    if (titleFilter) {
      params = params.set('title', titleFilter);
    }

    if (propertyTypeFilter) {
      params = params.set('property_type', propertyTypeFilter);
    }

    if (locationFilter) {
      params = params.set('location', locationFilter);
    }

    return this.http.get<any>(this.baseUrl, { params });
  }

}
