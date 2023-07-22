import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  showLoginForm: boolean = true;

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      // Display error message if email or password is empty
      Swal.fire('Error', 'Please enter your email and password.', 'error');
      return;
    }

    this.isLoading = true; // Set isLoading to true when the login process starts

    const loginData = {
      email: this.email,
      password: this.password
    };

    // Show SweetAlert loading indicator while the login process is ongoing
    Swal.fire({
      title: 'Logging in',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Replace the backend API URL with your actual backend API URL
    this.http.post<any>('http://localhost:5000/login/guest', loginData).subscribe(
      (response) => {
        this.isLoading = false; // Set isLoading to false after the login process

        // Close the SweetAlert loading indicator
        Swal.close();

        if (response.message === 'Guest login successful') {
          console.log('Login successful');
          if (this.email === 'ritesh@gmail.com' && this.password === 'ritesh@123') {
            // Redirect to the host page
            this.router.navigate(['/hosts']);

            // Show SweetAlert message for successful login
            Swal.fire('Welcome Admin!', 'Ritesh !!!', 'success');
          } else {
            // Redirect to the properties page
            this.router.navigate(['/properties']);

            // Show SweetAlert message for successful login
            Swal.fire('Login successful', '', 'success');
          }
        }
      },
      (error) => {
        console.error('Login error:', error.error);
        this.isLoading = false; // Set isLoading to false if the login process fails

        // Close the SweetAlert loading indicator
        Swal.close();

        // Show SweetAlert message for login error
        Swal.fire('Login error', 'Please check your email and password.', 'error');
      }
    );
  }

  toggleForm(showLoginForm: boolean) {
    this.showLoginForm = showLoginForm;
  }
}
