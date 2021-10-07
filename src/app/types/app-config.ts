export interface AppConfig {
  api: {
    signUp: string,
    login: string,
    logout: string,
    verifyAuth: string,
    checkEmail: string,
  }
  storage: {
    authStatusKey: string,
    emailsKey: string,
  }
}
