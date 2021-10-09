export interface SignUpData {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export interface LoginData {
  email: string,
  password: string,
}
export interface EmailCheckData {
  email: string,
}
export interface StateCheckResponseData {
  success: boolean,
}

export interface SignUpResponseData {
  _id: string,
  email: string,
  firstName: string,
  lastName: string
}

