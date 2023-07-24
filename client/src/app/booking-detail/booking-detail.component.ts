import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.css']
})
export class BookingDetailComponent implements OnInit {
  bookingDetails: any;
  currentStep: number = 0;
  generalDetailsForm: FormGroup;
  paymentDetailsForm: FormGroup;
  nextButtonDisabled: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.generalDetailsForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required]
    });

    this.paymentDetailsForm = this.formBuilder.group({
      cvv: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getBookingDetails();
  }

  getBookingDetails() {
    const bookingId = this.route.snapshot.paramMap.get('id');
    if (bookingId) {
      this.bookingService.getBookingDetails(bookingId).subscribe(
        (data) => {
          this.bookingDetails = data;
          console.log(this.bookingDetails.img);
        },
        (error) => {
          console.error('Error fetching booking details:', error);
        }
      );
    } else {
      console.error('Booking ID not found.');
    }
  }

  startBooking() {
    this.currentStep = 1;
  }

  nextStep() {
    if (this.currentStep === 1) {
      if (this.generalDetailsForm.valid) {
        this.currentStep++;
        this.nextButtonDisabled = false;
      } else {
        this.markFormGroupTouched(this.generalDetailsForm);
        this.nextButtonDisabled = true;
      }
    } else if (this.currentStep === 2) {
      if (this.paymentDetailsForm.valid) {
        this.currentStep++;
        this.nextButtonDisabled = false;
      } else {
        this.markFormGroupTouched(this.paymentDetailsForm);
        this.nextButtonDisabled = true;
      }
    }
  }

  previousStep() {
    this.currentStep--;
  }

  submitBooking() {
    Swal.fire({
      title: 'Submitting...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        this.submitForm().then(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Booking Successful',
              text: 'Your booking has been submitted successfully!',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate(['/']);
              this.bookingService.deleteBooking(this.bookingDetails.booking_id).toPromise();

            });
            this.currentStep = 0;
            this.generalDetailsForm.reset();
            this.paymentDetailsForm.reset();
          },
          (error) => {
            console.error('Error submitting booking:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An error occurred while submitting the booking. Please try again later.',
              showConfirmButton: false,
              timer: 3000
            })
          }
        ).finally(() => {

          Swal.hideLoading();
        });
      }
    });
  }

  private submitForm(): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, 2000));
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });

    // Set the 'nextButtonDisabled' to true if there are any invalid fields
    this.nextButtonDisabled = Object.values(formGroup.controls).some(control => control.invalid);
  }
}
