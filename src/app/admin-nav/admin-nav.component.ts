import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  username: string;

  constructor(private authenticationService: AuthService) {
      this.username = authenticationService.currentUserValue.username;
  }

  ngOnInit() {
  }

}
