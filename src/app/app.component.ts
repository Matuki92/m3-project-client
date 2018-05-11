import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'Matuki Beers';
  loading = true;
  anon: boolean;
  user: any;
  admin: boolean;
  logInActive = false;
  signUpActive = false;
  screenMode = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.loading = false;
      this.user = user;
      this.admin = user && user.role === 'admin';
      this.anon = !user;
    });
  }
  
  screenModeToggle() {
    this.screenMode = !this.screenMode;
  }

  toggleLogInForm() {
    this.logInActive = !this.logInActive;
  }

  toggleSignUpForm() {
    this.signUpActive = !this.signUpActive;
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/'])
      });
  }
}