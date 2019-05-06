import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  showRightPanel = false;
  userToRegister: any = {};
  userToLogin: any = {};
  @ViewChild('registerFormControl') registerFormControl: NgForm;
  @ViewChild('loginFormControl') loginFormControl: NgForm;
  emailPattern = '^[a-z0-9_%+.]+@[a-z0-9._]+\.[a-z]{2,4}$';

  constructor(private authService: AuthService, private router: Router,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }
  addRightPanel() {
    // this.showRightPanel = true;
    const elem = document.getElementById('container');
    elem.classList.add('right-panel-active');
  }
  removeRightPanel() {
    const elem = document.getElementById('container');
    elem.classList.remove('right-panel-active');
  }
  registerUser() {
    if (this.registerFormControl.invalid) {
      return;
    }
    this.authService
        .registerUser(this.userToRegister)
        .subscribe(res => {
          this.alertify.success('Successfully Registered user');
        }, err => this.alertify.error(err),
        () => {
          this.registerFormControl.resetForm();
          this.router.navigate(['auth']);
        });
  }
  loginUser() {
    if (this.loginFormControl.invalid) {
      return;
    }
    this.authService
        .loginUser(this.userToLogin)
        .subscribe(res => {
          this.alertify.success('Successfully logged in');
        }, err => {
          console.log(err);
           this.alertify.error(err);
        },
        () => {
          this.loginFormControl.resetForm();
          this.router.navigate(['']);
        });
  }

}
