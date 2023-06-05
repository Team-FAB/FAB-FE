export interface UserState {
  isLogged: boolean
  name: string | null
  jwt: string
  error: string
}

export interface LoginValues {
  email: string
  password: string
}
