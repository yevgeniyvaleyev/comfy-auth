import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (this.authService.isLoggedIn()) {
      return of(true)
    }
    this.router.navigate(['/login'], {
      queryParams: {
        targetUrl: state.url
      }
    });
    return of(false);
  }
}
