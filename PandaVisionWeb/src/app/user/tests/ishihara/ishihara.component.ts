import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../../../api-endpoints';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-ishihara',
  standalone: false,
  templateUrl: './ishihara.component.html',
  styleUrls: ['./ishihara.component.scss']
})
export class IshiharaComponent implements OnInit {
  images: string[] = [];
  currentIndex = 0;
  userInput = '';
  isTestRunning = false;

  showUserInfoPopup = false;
  gender: 'male' | 'female' | null = null;
  dateOfBirth: string = '';
  webTest: boolean = true;
  userInfoConfirmed: boolean = false;

  startTime: number = 0;
  endTime: number = 0;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    for (let i = 1; i <= 25; i++) {
      this.images.push(`assets/images/ishihara/plate${i}.png`);
    }
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.showUserInfoPopup = true;
    } else {
      this.userInfoConfirmed = true;
    }
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  confirmUserInfo(): void {
    if (!this.gender || !this.dateOfBirth) {
      alert('Proszę uzupełnić wszystkie pola.');
      return;
    }
    this.userInfoConfirmed = true;
    this.showUserInfoPopup = false;
  }

  startTest(): void {
    this.currentIndex = 0;
    this.isTestRunning = true;
    this.startTime = Date.now();
  }

  submitAnswer() {
    this.userInput = '';

    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.endTime = Date.now();
      const elapsed = (this.endTime - this.startTime) / 1000;

      this.sendResults(elapsed);
    }
  }

  sendResults(elapsedTime: number) {
    this.isTestRunning = false;

    const isLoggedIn = this.authService.isLoggedIn();
    const payload = {
      time: elapsedTime,
      user: isLoggedIn ? this.authService.getUsername() : 'N/A',
      genre: isLoggedIn ? null : this.gender,
      date_of_birth: isLoggedIn ? null : new Date(this.dateOfBirth).toISOString(),
      web_test: this.webTest
    };

    this.http.post(API_CONFIG.baseUrl + API_CONFIG.endpoints.ishihara_result, payload).subscribe({
      next: () => this.router.navigate(['/tests']),
      error: (err) => {
        console.error("Błąd przy zapisie wyniku:", err);
        this.router.navigate(['/tests']);
      }
    });
  }
}
