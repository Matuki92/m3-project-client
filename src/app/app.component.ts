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
  reset = true;
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
    if (!this.signUpActive) {
      this.logInActive = !this.logInActive;
    } else {
      this.toggleSignUpForm();
      this.toggleLogInForm();
    }
  }

  toggleSignUpForm() {
    if (!this.logInActive) {
      this.signUpActive = !this.signUpActive;
    } else {
      this.toggleLogInForm();
      this.toggleSignUpForm();
    }
  }

  logout() {
    this.authService.logout()
      .then(() => {
        this.router.navigate(['/'])
      });
  }

  resetMenu() {
    // toggles the drop dowm menu on/off in in the dom so that it resets and colappses
    // @todo there must be a better way
    this.reset = false;
    setTimeout(() => (this.reset = true));
  }
}