
import { AppConfig } from '../types/app-config';
import { InjectionToken } from '@angular/core';

export const APP_CONFIG_DATA: AppConfig = {
  api: {
    signUp: 'https://demo-api.now.sh/users',
    login: '/login',
    verifyAuth: '/verify-authentication',
    logout: '/logout',
    checkEmail: '/check-email',
  },
  storage: {
    emailsKey: 'recognizedEmails',
    authStatusKey: 'isAuthenticated',
  }
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
