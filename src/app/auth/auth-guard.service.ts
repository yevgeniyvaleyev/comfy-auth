import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.verifyLoginStatus().pipe(
      tap((isAuthenticated: boolean) => {
        if (!isAuthenticated) {
          this.router.navigate(['/auth/login'], {
            queryParams: {
              targetUrl: state.url,
            },
          });
        }
      })
    );
  }
}
