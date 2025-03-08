import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../api-endpoints';

@Component({
  selector: 'app-plots',
  standalone: false,
  templateUrl: './plots.component.html',
  styleUrl: './plots.component.scss'
})
export class PlotsComponent {
    plot1: string = '';
    plot2: string = '';
    plot3: string = '';
  
    constructor(private http: HttpClient) { }
  
    ngOnInit(): void {
      this.getPlots();
    }
  
    getPlots(): void {
      const apiUrl = API_CONFIG.baseUrl+API_CONFIG.endpoints.plots;  // Adres backendu
      this.http.get<{ plot1: string, plot2: string, plot3: string }>(apiUrl).subscribe((response) => {
        // Przypisz odpowiedź z serwera do zmiennych
        this.plot1 = response.plot1;
        this.plot2 = response.plot2;
        this.plot3 = response.plot3;
      }, (error) => {
        console.error('Błąd pobierania wykresów:', error);
      });
    }
}
