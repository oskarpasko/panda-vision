import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  username: string = JSON.parse(localStorage.getItem('user') || '{}').username;
}
