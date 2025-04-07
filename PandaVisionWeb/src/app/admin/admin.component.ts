import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api-endpoints';

@Component({
  standalone: false,
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  colorTests: any[] = [];
  taintTests: any[] = [];
  ishiharaTests: any[] = [];
  twoColorsTests: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(API_CONFIG.baseUrl + '/api/admin_mongo').subscribe(data => {
      this.colorTests = data.color_tests;
      this.taintTests = data.taint_tests;
      this.ishiharaTests = data.ishihara_tests;
      this.twoColorsTests = data.two_colors_tests;
    });
  }
}
