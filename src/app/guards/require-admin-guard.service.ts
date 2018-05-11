import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class RequireAdminGuardService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return this.authService.me()
      .then((user) => {
        if (user.role === 'admin') {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }

}