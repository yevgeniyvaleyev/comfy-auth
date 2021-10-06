import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';
import { LoginData, SignUpData } from '../types';
import { StorageService } from './storage.service';

@Injectable()
export class AuthenticationService {
  private isAuthenticated = false;
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated);
  private authStream: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    this.isAuthenticated = this.storage.authStatus;
    this.authStream = this.authSubject.pipe(
      tap((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
        this.storage.authStatus = isAuthenticated;
      })
    );
  }

  public signUp(data: SignUpData): Observable<any> {
    return this.http.post(this.config.signUpApi, data);
  }

  /**
   * This method emulates login action.
   * NOTE: It is made for _demonstration_ purpose!
   * @param {LoginData} loginData
   * @returns
   */
  public login(loginData: LoginData): Observable<boolean> {
    const isSuccess = this.storage.emails.includes(loginData.email);
    this.authSubject.next(isSuccess);
    return this.authStream;
  }

  public logout(): Observable<boolean> {
    this.authSubject.next(false);
    return this.authStream;
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Checks whether email is already used in another account.
   * NOTE: this method is made for _demonstration_ purpose.
   * @param {string} email
   * @returns
   */
  public checkEmailUniqueness(email: string): Observable<boolean> {
      const isUnique = !this.storage.emails.includes(email);
      // 'delay' is used to simulate network delay
      return of(isUnique).pipe(delay(1500))
  }
}
