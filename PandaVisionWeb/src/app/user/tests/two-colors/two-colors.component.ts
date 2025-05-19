import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../../../api-endpoints';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-two-colors',
  standalone: false,
  templateUrl: './two-colors.component.html',
  styleUrl: './two-colors.component.scss'
})
export class TwoColorsComponent implements OnInit {
  colors: {
    correct_answer: string;
    correct_red: number;
    correct_green: number;
    correct_blue: number;
    incorrect_answer: string;
    incorrect_red: number;
    incorrect_green: number;
    incorrect_blue: number;
  }[] = [];

  TIME_OF_TEST: number = 2000;

  // Iteracje w których prawidłowe kolory będą po prawe stronie
  colorsOnRight = [3, 6, 8, 9, 13, 16, 17, 19, 22, 23, 25, 28]; 

  currentIndex: number = 0;
  isTestRunning: boolean = false;
  interval: any;
  isReversed: boolean = false;
  showUserInfoPopup: boolean = false;
  gender: 'male' | 'female' | null = null;
  dateOfBirth: string = '';
  webTest: boolean = true;
  userInfoConfirmed: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchColors();

    if (!this.authService.isLoggedIn()) {
      this.showUserInfoPopup = true;
    } else {
      this.userInfoConfirmed = true;
    }
  }

  fetchColors(): void {
    this.http.get<typeof this.colors>(API_CONFIG.baseUrl + API_CONFIG.endpoints.two_colors).subscribe(
      (data) => {
        this.colors = data;
      },
      (error) => {
        console.error('Error fetching colors:', error);
      }
    );
  }

  startTest(): void {
    if (!this.userInfoConfirmed) {
      this.showUserInfoPopup = true;
      return;
    }

    this.runTest();
  }

  confirmUserInfo(): void {
    if (!this.gender || !this.dateOfBirth) {
      alert('Proszę uzupełnić wszystkie pola.');
      return;
    }

    this.userInfoConfirmed = true;
    this.showUserInfoPopup = false;
  }

  runTest(): void {
    if (this.colors.length === 0) return;

    this.isTestRunning = true;
    this.currentIndex = 0;
    this.randomizeOrder();

    this.interval = setInterval(() => {
      this.currentIndex++;
      this.randomizeOrder();
      if (this.currentIndex >= this.colors.length) {
        this.endTest();
      }
    }, this.TIME_OF_TEST);
  }

  randomizeOrder(): void {
    // this.isReversed = Math.random() < 0.5;  // <- Poprawna odpowiedź jest losowo na lewo lub na prawo

    // Poprawne kolory będa po praweh stronie przy iterajach z tablicy < colorsOnRight >
    this.isReversed = this.colorsOnRight.includes(this.currentIndex + 1);
  }

  endTest(): void {
    clearInterval(this.interval);
    this.isTestRunning = false;

    const isLoggedIn = this.authService.isLoggedIn();
    const payload = {
      time: this.colors.length,
      user: isLoggedIn ? this.authService.getUsername() : 'N/A',
      genre: isLoggedIn ? null : this.gender,
      date_of_birth: isLoggedIn ? null : new Date(this.dateOfBirth).toISOString(),
      web_test: this.webTest
    };

    this.http.post(API_CONFIG.baseUrl + API_CONFIG.endpoints.two_colors_result, payload).subscribe({
      next: () => this.router.navigate(['/tests']),
      error: (err) => {
        console.error("Błąd przy zapisie wyniku:", err);
        this.router.navigate(['/tests']);
      }
    });
  }
}
