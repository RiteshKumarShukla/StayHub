import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookedProperties: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService // Import BookingService
  ) { }

  ngOnInit(): void {
    // Fetch the booked properties from the backend
    this.bookingService.getBookedProperties().subscribe(
      (response: any) => {
        console.log('Booked properties:', response);
        this.bookedProperties = response;
      },
      (error: any) => {
        console.error('Error fetching booked properties:', error);
      }
    );
  }

  deleteProperty(bookingId: string): void {
    // Send a request to the backend to delete the booking with the given bookingId
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        // On successful deletion, remove the booking from the bookedProperties array
        this.bookedProperties = this.bookedProperties.filter((property) => property.booking_id !== bookingId);
      },
      (error: any) => {
        console.error('Error deleting booking:', error);
      }
    );
  }
}
