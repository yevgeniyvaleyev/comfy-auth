import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';
import { signUpData } from '../types';

@Injectable()
export class AuthenticationService {
  private isAuthenticated = false;
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
  private authStream: Observable<boolean>;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    const isAuthenticatedKey = this.config.storageKeys.isAuthenticated;
    this.isAuthenticated = localStorage.getItem(isAuthenticatedKey) === 'true';
    this.authStream = this.authSubject.pipe(
      tap((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        localStorage.setItem(isAuthenticatedKey, String(isAuthenticated));
      })
    );
  }

  public signUp(data: signUpData): Observable<any> {
    return this.http.post(this.config.signUpApi, data);
  }

  public login(): Observable<boolean> {
    // Fake authentication
    this.authSubject.next(true);
    return this.authStream;
  }

  public logout(): Observable<boolean> {
    this.authSubject.next(false);
    return this.authStream;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
