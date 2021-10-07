import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';
import { LoginData, SignUpData } from '../types';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.isAuthenticated = this.storage.authStatus;
  }

  public get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  public signUp(data: SignUpData): Observable<any> {
    return this.http.post(this.config.api.signUp, data);
  }

  public login(loginData: LoginData): Observable<boolean> {
    return this.http.post(this.config.api.login, loginData).pipe(
      map((response: any) => {
        this.isAuthenticated = !!response?.success;
        return this.isAuthenticated;
      })
    );
  }

  public logout(): Observable<boolean> {
    return this.http.post(this.config.api.logout, {}).pipe(
      map((response: any) => {
        this.isAuthenticated = !response?.success;
        return this.isAuthenticated;
      })
    );
  }

  public verifyLoginStatus(): Observable<boolean> {
    return this.http.post(this.config.api.verifyAuth, {}).pipe(
      map((response: any) => {
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
      .post(this.config.api.checkEmail, { email })
      .pipe(map((response: any) => !!response.success));
  }
}
