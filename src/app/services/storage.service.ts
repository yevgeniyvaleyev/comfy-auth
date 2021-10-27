import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { APP_CONFIG } from '../config/tokens';
import { AppConfig } from '../types/app-config';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

  public set authStatus(isAuthenticated: boolean) {
    const { authStatusKey } = this.config.storage;
    localStorage.setItem(authStatusKey, String(isAuthenticated));
  }

  public get authStatus(): boolean {
    const { authStatusKey } = this.config.storage;
    if (!isPlatformBrowser(this.platformId)) {
      // needed for SSR
      return false;
    }
    return localStorage.getItem(authStatusKey) === 'true';
  }

  public addEmail(email: string): boolean {
    const { emailsKey } = this.config.storage;

    if (this.emails.includes(email)) {
      return false;
    }
    localStorage.setItem(
      emailsKey,
      [...this.emails, email].join(',')
    );
    return true;
  }

  public get emails(): string[] {
    const { emailsKey } = this.config.storage;
    const emailsExpression = localStorage.getItem(emailsKey);
    const emails = !!emailsExpression
      ? emailsExpression.split(',')
      : [];
    return emails;
  }
}
