import { User } from './session'

export interface CommonState {
  user: User
}
export interface RootState {
  common: CommonState
}
