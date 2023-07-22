import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  lastName: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    this.isLoading = true;

    const data = {
      email: this.email,
      password: this.password,
      name: this.name,
      lastName: this.lastName
    };

    this.http.post<any>('http://127.0.0.1:5000/signup/guest', data).subscribe(
      (response) => {
        // Registration successful
        Swal.fire('Register successful', 'You can now login with your account.', 'success');
        this.isLoading = false;
        this.router.navigate(['/login']); // Redirect to the login page
      },
      (error) => {
        // Registration failed
        Swal.fire('Error', 'Registration failed. Please try again.', 'error');
        this.isLoading = false;
      }
    );
  }
}