import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  isLoggedIn: boolean = false;
  user: any = null;

  constructor(private router: Router) {
    // Sprawdzenie, czy użytkownik jest już zalogowany
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['login']);
    window.location.reload();
  }
}
