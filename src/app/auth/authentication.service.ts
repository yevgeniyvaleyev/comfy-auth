import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';
import {
  LoginData,
  SignUpData,
  SignUpResponseData,
  StateCheckResponseData,
} from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {}

  public get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public signUp(data: SignUpData): Observable<SignUpResponseData> {
    return this.http
      .post<SignUpResponseData>(this.config.api.signUp, data);
  }

  public login(loginData: LoginData): Observable<boolean> {
    return this.http
      .post<StateCheckResponseData>(this.config.api.login, loginData)
      .pipe(
        map(this.getSuccessState),
        tap((isLoggedIn: boolean) => {
          this.isAuthenticated = isLoggedIn;
        })
      );
  }

  public logout(): Observable<boolean> {
    return this.http
      .post<StateCheckResponseData>(this.config.api.logout, {})
      .pipe(
        map(this.getSuccessState),
        tap((isLoggedOut: boolean) => {
          this.isAuthenticated = !isLoggedOut;
        })
      );
  }

  public verifyLoginStatus(): Observable<boolean> {
    return this.http
      .post<StateCheckResponseData>(this.config.api.verifyAuth, {})
      .pipe(
        map(this.getSuccessState),
        tap((isValid: boolean) => {
          this.isAuthenticated = isValid;
        })
      );
  }

  /**
   * Checks whether email is already used in another account.
   * @param {string} email
   * @returns {Observable<boolean>}
   */
  public checkEmailUniqueness(email: string): Observable<boolean> {
    return this.http
      .post<StateCheckResponseData>(this.config.api.checkEmail, { email })
      .pipe(map(this.getSuccessState));
  }

  private getSuccessState (response: StateCheckResponseData): boolean {
    return !!response?.success;
  }
}
