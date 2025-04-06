import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private username: string | null = null;

  constructor() {}

  setUser(user: { username: string; role: string }) {
    this.username = user.username;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUsername(): string | null {
    if (!this.username) {
      const userString = localStorage.getItem('user');
      if (userString) {
        try {
          const user = JSON.parse(userString);
          this.username = user.username;
        } catch (e) {
          console.error('Błąd parsowania usera z localStorage:', e);
          return null;
        }
      }
    }
    return this.username;
  }

  isLoggedIn(): boolean {
    return this.getUsername() !== null;
  }

  logout(): void {
    this.username = null;
    localStorage.removeItem('user');
  }
}
