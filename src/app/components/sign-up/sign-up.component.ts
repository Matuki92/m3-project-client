import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  feedbackEnabled = false;
  error: string;
  processing = false;
  user: any = {};
  // repeatPassword: string = '';
  // noMatch = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    // if (this.user.password !== this.repeatPassword) {
    //   return this.noMatch = true;
    // }
    if (form.valid) {
      this.processing = true;
      this.authService.signup(this.user)
        .then((result) => {
         this.router.navigate(['/']);
        })
        .catch((err) => {
          this.error = err.error.code; // :-)
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }
}
