import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isUserloggedIn: boolean;
  isUserAdmin: boolean;
  loggedInUser: any;
  showNavBar: boolean;
  categories = [
    {displayName: 'Business', value: Category.Business},
    {displayName: 'Culture', value: Category.Culture},
    {displayName: 'Entertainment', value: Category.Entertainment},
    {displayName: 'News Style', value: Category.NewsStyle},
    {displayName: 'Sports', value: Category.Sport},
  ];

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
  showNav() {
    if (document.getElementById('nav').classList.contains('top-nav')) {
      document.getElementById('nav').classList.remove('top-nav');
    } else {
      document.getElementById('nav').classList.add('top-nav');
    }
  }

}
