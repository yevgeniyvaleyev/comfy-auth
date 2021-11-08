import { AppConfig } from "./types";

export const global_environment: AppConfig = {
  production: false,
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
};
