import { User } from './session'

export interface AuthState {
  user: User
}
export interface RootState {
  auth: AuthState
}
