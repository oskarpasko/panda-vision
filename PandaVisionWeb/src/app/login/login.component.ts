import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = ''; // The username entered by the user
  password: string = ''; // The password entered by the user
  errorMessage: string = ''; // To store any error messages

  constructor(
    private http: HttpClient,  
    private router: Router,   
    private titleService: Title 
  ) {
    this.titleService.setTitle('Logowanie');
  }

  // This method is triggered when the user submits the login form
  login() {
    const loginData = {
      username: this.username, // The username from the form
      password: this.password  // The password from the form
    };

    // URL to API
    const loginUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`;

    // Sending a POST request to the server with the login data
    this.http.post(loginUrl, loginData).subscribe(
      (response: any) => {
        // If the server responds with success
        if (response.success) {
          // Storing user data in the local storage for session persistence
          localStorage.setItem('user', JSON.stringify(response.user));

          // If the user is an admin, redirect to the admin page
          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            // Otherwise, redirect to the regular user page
            this.router.navigate(['/user']);
          }
        } else {
          // If the response indicates a failure, show the error message
          this.errorMessage = response.message;
        }
      },
      (error) => {
        // If an error occurs during the HTTP request, show a connection error message
        this.errorMessage = 'Błąd połączenia z serwerem'; // Server connection error
      }
    );
  }
}
