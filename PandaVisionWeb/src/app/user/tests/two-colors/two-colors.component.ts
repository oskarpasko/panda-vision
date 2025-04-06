import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../../../api-endpoints';

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

  currentIndex: number = 0;
  isTestRunning: boolean = false;
  interval: any;
  isReversed: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchColors();
  }

  fetchColors(): void {
    this.http.get<typeof this.colors>(API_CONFIG.baseUrl + API_CONFIG.endpoints.two_colors).subscribe(
      (data) => {
        this.colors = data;
        console.log("Aktualny indeks:", this.currentIndex);
        console.log("Aktualny kolor:", this.colors[this.currentIndex]);
      },
      (error) => {
        console.error('Error fetching colors:', error);
      }
    );
  }

  startTest(): void {
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
    }, 1000);
  }

  randomizeOrder(): void {
    this.isReversed = Math.random() < 0.5;
  }

  endTest(): void {
    clearInterval(this.interval);
    this.isTestRunning = false;
  
    // Przykładowe dane - można je dynamicznie zebrać od użytkownika (formularz)
    const payload = {
      time: this.colors.length,                    // np. 10 sekund testu
      user: 'anonymous',                           // lub pobrać z sesji/logowania
      genre: 'unspecified',                        // np. 'male' / 'female'
      date_of_birth: '2000-01-01T00:00:00.000Z'    // lub null, jeśli nieznana
    };
  
    this.http.post(API_CONFIG.baseUrl+API_CONFIG.endpoints.two_colors_result, payload).subscribe({
      next: (res) => {
        console.log("Wynik zapisany", res);
        this.router.navigate(['/tests']);
      },
      error: (err) => {
        console.error("Błąd przy zapisie wyniku:", err);
        this.router.navigate(['/tests']);
      }
    });
  }  
}
