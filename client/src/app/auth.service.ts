import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Add a property to keep track of the user's authentication status
  private isLoggedInUser: boolean = false;

  constructor() { }

  // Function to perform guest login
  guestLogin(email: string, password: string): Promise<boolean> {
    // Replace this with your actual login logic
    // For now, we'll assume that the login is successful if the email and password are not empty
    const loginSuccessful = email !== '' && password !== '';

    if (loginSuccessful) {
      this.isLoggedInUser = true; // Mark the user as logged in
      return Promise.resolve(true);
    } else {
      this.isLoggedInUser = false;
      return Promise.reject(false);
    }
  }

  // Function to check if the user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInUser;
  }

  // Function to log out the user
  logout(): void {
    this.isLoggedInUser = false;
  }
}
