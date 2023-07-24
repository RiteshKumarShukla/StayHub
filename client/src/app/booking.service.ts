import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'https://stayhub-backend.onrender.com/api/properties/book'; // Update this URL if your backend URL is different

  constructor(private http: HttpClient) { }

  // Method to book a property
  bookProperty(propertyId: string, guestName: string): Observable<any> {
    const bookingData = {
      propertyId,
      guestName
    };

    return this.http.post<any>(`${this.baseUrl}`, bookingData);
  }

  // Method to get booked properties
  getBookedProperties(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  // Method to delete a booking by booking ID
  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${bookingId}`);
  }


  getBookingDetails(bookingId: string): Observable<any> {
    const url = `${this.baseUrl}/${bookingId}`;
    return this.http.get<any>(url);
  }
}
