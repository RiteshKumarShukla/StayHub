import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  bookedProperties: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService // Import BookingService
  ) { }

  ngOnInit(): void {
    // Fetch the booked properties from the backend
    this.bookingService.getBookedProperties().subscribe(
      (response: any) => {
        console.log('Booked properties:', response);
        this.bookedProperties = response;

        // Check if there are no booked properties
        if (this.bookedProperties.length === 0) {
          Swal.fire(
            'Empty Booking List',
            "You haven't added any properties to your bookings yet.",
            'info'
          );
        }
      },
      (error: any) => {
        console.error('Error fetching booked properties:', error);
      }
    );
  }

  getBookingDetails(property: any) {
    console.log("Booking Details:", property);
    this.router.navigate(['/booking', property]);
  }
  
  deleteProperty(bookingId: string): void {
    // Show a confirmation SweetAlert before deleting the booking
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Send a request to the backend to delete the booking with the given bookingId
        this.bookingService.deleteBooking(bookingId).subscribe(
          () => {
            // On successful deletion, remove the booking from the bookedProperties array
            this.bookedProperties = this.bookedProperties.filter((property) => property.booking_id !== bookingId);

            // Show success SweetAlert
            Swal.fire('Deleted!', 'The booking has been deleted successfully.', 'success');
          },
          (error: any) => {
            console.error('Error deleting booking:', error);

            // Show error SweetAlert
            Swal.fire('Error', 'An error occurred while deleting the booking.', 'error');
          }
        );
      }
    });
  }
}
