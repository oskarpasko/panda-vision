import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  username: string = '';        // The username entered by the user
  dateOfBirth: string = '';     // The date of birth entered by the user
  gender: string = '';          // The gender selected by the user
  password: string = '';        // The password entered by the user
  confirmPassword: string = ''; // The password confirmation entered by the user
  errorMessage: string = '';    // To store any error messages
  isLoading: boolean = false;   // Flag to indicate if the registration process is ongoing

  constructor(
    private http: HttpClient, 
    private router: Router,   
    private titleService: Title
  ) {
    this.titleService.setTitle('Rejestracja');
  }

  // This method is triggered when the user submits the registration form
  register() {
    // Checking if all fields are filled
    if (!this.username || !this.dateOfBirth || !this.gender || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Proszę wypełnić wszystkie pola'; // Error message if any field is empty
      return;
    }

    // Checking if the password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Hasła nie są identyczne'; // Error message if passwords do not match
      return;
    }

    this.isLoading = true; // Set the loading flag to true to show a loading indicator
    this.errorMessage = ''; // Reset the error message in case of a new registration attempt

    // Prepare the registration data to be sent to the server
    const registerData = {
      username: this.username,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      password: this.password
    };

    // URL to API
    const registerUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.register}`;

    // Sending a POST request to the server with the registration data
    this.http.post(registerUrl, registerData).subscribe(
      (response: any) => {
        this.isLoading = false; // Set loading flag to false once the response is received
        // If the registration is successful, navigate to the login page
        if (response.success) {
          this.router.navigate(['/login']);  // Redirect to the login page
        } else {
          // If the registration fails, display the error message returned from the server
          this.errorMessage = response.message || 'Rejestracja nie powiodła się';
        }
      },
      () => {
        // If an error occurs during the HTTP request, show a connection error message
        this.isLoading = false;
        this.errorMessage = 'Błąd połączenia z serwerem';
      }
    );
  }
}
