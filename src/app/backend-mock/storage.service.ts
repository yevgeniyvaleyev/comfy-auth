import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {}

  public set authStatus(isAuthenticated: boolean) {
    const { authStatusKey } = environment.storage;
    localStorage.setItem(authStatusKey, String(isAuthenticated));
  }

  public get authStatus(): boolean {
    const { authStatusKey } = environment.storage;
    if (!isPlatformBrowser(this.platformId)) {
      // needed for SSR
      return false;
    }
    return localStorage.getItem(authStatusKey) === 'true';
  }

  public addEmail(email: string): boolean {
    const { emailsKey } = environment.storage;

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
    const { emailsKey } = environment.storage;
    const emailsExpression = localStorage.getItem(emailsKey);
    const emails = !!emailsExpression
      ? emailsExpression.split(',')
      : [];
    return emails;
  }
}
