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
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Logowanie');
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
          // Zapisz dane użytkownika do localStorage (lub sesji)
          localStorage.setItem('user', JSON.stringify(response.user));

          if (response.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/user']);
          }
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'Błąd połączenia z serwerem';
      }
    );
  }
}
