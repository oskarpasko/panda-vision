import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  username: string = JSON.parse(localStorage.getItem('user') || '{}').username;
}
