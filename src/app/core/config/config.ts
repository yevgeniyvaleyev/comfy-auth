import { AppConfig } from '../../types/app-config';

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
