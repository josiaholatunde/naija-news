import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    this.alertify.error('Yo fam! You must be logged in');
    return false;
  }
}
