import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUserloggedIn: boolean;
  isUserAdmin: boolean;
  loggedInUser: any;

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
    this.authService.getLoggedInStatus().subscribe(status => {
      this.isUserloggedIn = status;
      this.loggedInUser = this.authService.getLoggedInUser();
      if (this.authService.isUserAdmin()) {
        this.isUserAdmin = true;
      }
    });
    if (this.authService.isUserLoggedIn()) {
      this.isUserloggedIn = true;
      this.loggedInUser = this.authService.getLoggedInUser();
      if (this.authService.isUserAdmin()) {
        this.isUserAdmin = true;
      }
    }
  }
  logout() {
   this.authService.logoutUser();
  }

}
