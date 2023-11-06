import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(_: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
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
