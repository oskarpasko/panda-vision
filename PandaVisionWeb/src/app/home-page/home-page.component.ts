import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomeComponent {
  // Properties for the login form
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  user: any = null;

  // Inject HttpClient for API calls and Title service for setting page title
  constructor(
    private http: HttpClient,
    private titleService: Title
  ) {
    // Set the page title dynamically
    this.titleService.setTitle('Home Page');
    // Checking if the user is logged
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
    }
  }

  // Login function to handle user authentication
  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    // API endpoint for login
    const loginUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`;

    // Make POST request to login API
    this.http.post(loginUrl, loginData).subscribe(
      (response: any) => {
        // If login is successful, store user data in localStorage and update state
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.user = response.user;
          this.isLoggedIn = true;
          window.location.reload(); // Reload page to reflect login state
        } else {
          this.errorMessage = response.message; // Display error message if login fails
        }
      },
      () => {
        this.errorMessage = 'Invalid username or password'; // Default error message for failed request
      }
    );
  }

  // Array of images for the slider
  images = [
    { src: 'assets/images/app1.jpg', alt: 'Color Test', description: 'Color Test allows you to test color recognition in the simplest way.' },
    { src: 'assets/images/app2.jpg', alt: 'Ishihara Test', description: 'Classic test using Ishihara plates.' },
    { src: 'assets/images/app3.jpg', alt: 'Color Perception Test', description: 'In this test, you can not only check your color recognition skills but also have fun.' }
  ];

  // Current index of the active image in the slider
  currentIndex: number = 0;

  // Function to go to the next image in the slider
  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++; // Move to the next image
    } else {
      this.currentIndex = 0; // Loop back to the first image if at the end
    }
  }

  // Function to go to the previous image in the slider
  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--; // Move to the previous image
    } else {
      this.currentIndex = this.images.length - 1; // Loop back to the last image if at the start
    }
  }
}
