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

export interface SignUpResponseData {
  _id: string,
  email: string,
  firstName: string,
  lastName: string
}
