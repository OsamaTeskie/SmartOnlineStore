import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // myBrowser:any;
  constructor(private dataService: ApiService) {}

  isLoggedIn() {
    return this.dataService.isLoggedIn();
  }

  isAdmin() {
    return this.dataService.isAdmin();
  }
  
  logout() {
    this.dataService.logout();
  }
  
}
