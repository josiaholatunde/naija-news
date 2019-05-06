import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../models/UserRole';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.apiUrl}/auth`;
  private loggedInStatus = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router,
    private alertify: AlertifyService) { }

  getLoggedInStatus() {
    return this.loggedInStatus.asObservable();
  }
  isUserLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user;
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isUserAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.role === UserRole.Admin ? true : false;
    }
    return null;
  }
  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  registerUser(userToRegister: any) {
    return this.http.post(`${this.baseUrl}/register`, userToRegister)
              .pipe();
  }
  loginUser(userToLogin: any) {
    return this.http.post<{user: any, token: string, message: string}>(`${this.baseUrl}/login`, userToLogin)
              .pipe(
                map((res) => {
                  if (res.token) {
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    this.loggedInStatus.next(true);
                  }
                  return res;
                })
              );
  }
  logoutUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.loggedInStatus.next(false);
    this.router.navigate(['']);
    this.alertify.success('Thanks for visiting, hope to see you soon');
  }
}
