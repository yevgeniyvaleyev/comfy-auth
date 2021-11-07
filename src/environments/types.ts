export interface AppConfig {
  production: boolean,
  api: {
    signUp: string,
    login: string,
    logout: string,
    verifyAuth: string,
    checkEmail: string,
  },
  storage: {
    authStatusKey: string,
    emailsKey: string,
  }
}
