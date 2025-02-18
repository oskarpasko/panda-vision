import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  username: string = JSON.parse(localStorage.getItem('user') || '{}').username;
}
