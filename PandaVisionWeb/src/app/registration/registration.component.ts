import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_CONFIG } from '../api-endpoints';
import { Title } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  username: string = '';
  dateOfBirth: string = '';
  gender: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router, private titleService: Title) {
    this.titleService.setTitle('Rejestracja');
  }

  register() {
    if (!this.username || !this.dateOfBirth || !this.gender || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Proszę wypełnić wszystkie pola';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Hasła nie są identyczne';
      return;
    }

    this.isLoading = true;
    this.errorMessage = ''; // Resetujemy komunikat o błędzie

    const registerData = {
      username: this.username,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      password: this.password
    };

    const registerUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.register}`;

    this.http.post(registerUrl, registerData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.success) {
          this.router.navigate(['/login']);  // Przekierowanie do logowania
        } else {
          this.errorMessage = response.message || 'Rejestracja nie powiodła się';
        }
      },
      () => {
        this.isLoading = false;
        this.errorMessage = 'Błąd połączenia z serwerem';
      }
    );
  }
}
