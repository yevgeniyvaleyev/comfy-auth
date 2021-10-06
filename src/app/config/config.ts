import { AppConfig } from '../types/app-config';

export const APP_CONFIG_DATA: AppConfig = {
  signUpApi: 'https://demo-api.now.sh/users',
  storage: {
    emailsKey: 'recognizedEmails',
    authStatusKey: 'isAuthenticated',
  }
}
