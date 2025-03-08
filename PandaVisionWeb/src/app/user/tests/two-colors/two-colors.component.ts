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
  colors: number[][] = [];
  currentIndex: number = 0;
  isTestRunning: boolean = false;
  interval: any;
  isReversed: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchColors();
  }

  fetchColors(): void {
    this.http.get<number[][]>(API_CONFIG.baseUrl+API_CONFIG.endpoints.two_colors).subscribe(
      (data) => {
        this.colors = data;
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
    }, 5000);
  }

  randomizeOrder(): void {
    this.isReversed = Math.random() < 0.5;
  }

  endTest(): void {
    clearInterval(this.interval);
    this.isTestRunning = false;
    this.router.navigate(['/tests']);
  }
}
