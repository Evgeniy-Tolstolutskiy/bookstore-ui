import { Component, OnInit } from '@angular/core';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username: string;

  constructor(private authenticationService: AuthService) {
      this.username = authenticationService.currentUserValue.username;
  }

  ngOnInit() {
  }



}
