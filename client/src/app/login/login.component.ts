// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   isLoading: boolean = false;
//   showLoginForm: boolean = true;

//   constructor(private http: HttpClient, private router: Router) { }

//   onLogin() {
//     if (!this.email || !this.password) {
//       Swal.fire('Error', 'Please enter your email and password.', 'error');
//       return;
//     }

//     this.isLoading = true;

//     const loginData = {
//       email: this.email,
//       password: this.password
//     };
//     Swal.fire({
//       title: 'Logging in',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });
//     this.http.post<any>('http://localhost:5000/login/guest', loginData).subscribe(
//       (response) => {
//         this.isLoading = false;
//         Swal.close();

//         if (response.message === 'Guest login successful') {
//           console.log('Login successful');
//           if (this.email === 'ritesh@gmail.com' && this.password === 'ritesh@123') {
//             this.router.navigate(['/hosts']);
//             Swal.fire('Welcome Admin!', 'Ritesh !!!', 'success');
//           } else {
//             this.router.navigate(['/properties']);
//             Swal.fire('Login successful', '', 'success');
//           }
//         }
//       },
//       (error) => {
//         console.error('Login error:', error.error);
//         this.isLoading = false;
//         Swal.close();
//         Swal.fire('Login error', 'Please check your email and password.', 'error');
//       }
//     );
//   }

//   toggleForm(showLoginForm: boolean) {
//     this.showLoginForm = showLoginForm;
//   }
// }


import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service'; // Import the AuthService

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

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  onLogin() {
    if (!this.email || !this.password) {
      Swal.fire('Error', 'Please enter your email and password.', 'error');
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.email,
      password: this.password
    };
    Swal.fire({
      title: 'Logging in',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Call the guestLogin function from the AuthService
    this.authService.guestLogin(this.email, this.password).then(
      () => {
        this.isLoading = false;
        Swal.close();

        if (this.email === 'ritesh@gmail.com' && this.password === 'ritesh@123') {
          this.router.navigate(['/hosts']);
          Swal.fire('Welcome Admin!', 'Ritesh !!!', 'success');
        } else {
          this.router.navigate(['/properties']);
          Swal.fire('Login successful', '', 'success');
        }
      },
      () => {
        console.error('Login error:');
        this.isLoading = false;
        Swal.close();
        Swal.fire('Login error', 'Please check your email and password.', 'error');
      }
    );
  }

  toggleForm(showLoginForm: boolean) {
    this.showLoginForm = showLoginForm;
  }
}
