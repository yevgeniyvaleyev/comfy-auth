import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  private isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
  private authStream: Observable<boolean>;

  constructor() {
    this.authStream = this.authSubject.pipe(
      tap((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        localStorage.setItem('isAuthenticated', String(isAuthenticated))
      })
    )
  }

  login() {
    // Fake authentication
    this.authSubject.next(true);
    return this.authStream;
  }

  logout() {
    this.authSubject.next(false);
    return this.authStream;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}
