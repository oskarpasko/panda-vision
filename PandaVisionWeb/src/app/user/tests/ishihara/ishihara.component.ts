import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ishihara',
  standalone: false,
  templateUrl: './ishihara.component.html',
  styleUrl: './ishihara.component.scss'
})
export class IshiharaComponent implements OnInit {
  images: string[] = [];
  currentIndex = 0;
  userInput = '';
  showNext = false;

  startTime: number = 0;
  endTime: number = 0; 
  elapsedTime: number = 0;

  constructor(private router: Router) {
    for (let i = 1; i <= 25; i++) {
      this.images.push(`assets/images/ishihara/plate${i}.png`);
    }
  }

  ngOnInit() {
    this.startTime = Date.now();
  }

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  submitAnswer() {
    // Here is the place to save user's answers
  
    this.userInput = '';
    this.showNext = false;
  
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.endTime = Date.now();
      this.elapsedTime = (this.endTime - this.startTime) / 1000; 

      alert(`Test zakończony! Czas trwania: ${this.elapsedTime} sekund.`);

      this.router.navigate(['/tests']);
    }
  }
}
