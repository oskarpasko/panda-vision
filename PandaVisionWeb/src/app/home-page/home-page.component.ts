import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomeComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoggedIn: boolean = false;
  user: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Strona główna');

    // Sprawdzenie, czy użytkownik jest już zalogowany
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
    }
  }

  login() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    const loginUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.login}`;

    this.http.post(loginUrl, loginData).subscribe(
      (response: any) => {
        if (response.success) {
          localStorage.setItem('user', JSON.stringify(response.user));
          this.user = response.user;
          this.isLoggedIn = true;
        } else {
          this.errorMessage = response.message;
        }
      },
      () => {
        this.errorMessage = 'Błąd połączenia z serwerem';
      }
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['/']);
  }

  // Tablica obrazków
  images = [
    { src: 'assets/images/app1.jpg', alt: 'Test Kolorów', description: 'Test Kolorów pozwala przetestować możliwość rozpoznawania kolorów w najprostszy sposób.' },
    { src: 'assets/images/app2.jpg', alt: 'Test Ishihary', description: 'Klasyczny test z wykorzystaniem tablic Ishihary.' },
    { src: 'assets/images/app3.jpg', alt: 'Test Barw', description: 'Przy tym teście można nie tylko przebadać umiejętność rozpoznawania kolorów. Można przy tym również się dobrze bawić.' }
  ];

  // Indeks aktualnego slajdu
  currentIndex: number = 0;

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Można dodać, aby slider wracał do pierwszego zdjęcia
    }
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1; // Można dodać, aby slider wracał do ostatniego zdjęcia
    }
  }
}
