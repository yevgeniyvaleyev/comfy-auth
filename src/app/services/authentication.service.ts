import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';
import { LoginData, SignUpData, SignUpResponseData, StateCheckResponseData } from '../types';

@Injectable()
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
    return this.http.post<SignUpResponseData>(this.config.api.signUp, data);
  }

  public login(loginData: LoginData): Observable<boolean> {
    return this.http.post<StateCheckResponseData>(this.config.api.login, loginData).pipe(
      map((response: StateCheckResponseData) => {
        this.isAuthenticated = !!response?.success;
        return this.isAuthenticated;
      })
    );
  }

  public logout(): Observable<boolean> {
    return this.http.post<StateCheckResponseData>(this.config.api.logout, {}).pipe(
      map((response: StateCheckResponseData) => {
        this.isAuthenticated = !response?.success;
        return this.isAuthenticated;
      })
    );
  }

  public verifyLoginStatus(): Observable<boolean> {
    return this.http.post<StateCheckResponseData>(this.config.api.verifyAuth, {}).pipe(
      map((response: StateCheckResponseData) => {
        this.isAuthenticated = !!response?.success;
        return this.isAuthenticated;
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
      .pipe(map((response: StateCheckResponseData) => !!response.success));
  }
}
