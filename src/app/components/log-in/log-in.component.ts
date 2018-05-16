import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  feedbackEnabled = false;
  error: string;
  processing = false;
  user: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = {};
  }

  submitForm(form) {
    this.error = '';
    this.feedbackEnabled = true;
    if (form.valid) {
      this.processing = true;
      this.authService.login(this.user)
        .then((result) => {
          if(result.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/beers']);
          }
        })
        .catch((err) => {
          this.error = err.error.code; // :-)
          this.processing = false;
          this.feedbackEnabled = false;
        });
    }
  }
}
