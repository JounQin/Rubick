import { Store } from 'vuex'

export interface User {
  namespace: string
  username?: string
  email?: string
  token?: string
}

export interface Profile {
  company: string
  logo_file: string
}

export interface Region {
  id: string
  name: string
}

export interface CommonState {
  user: User
  checked?: boolean
  regions?: Region[]
  regionId?: string
  profile?: Profile
}

export interface RootState {
  common: CommonState
}

export type RootStore = Store<RootState>

export type CommonStore = Store<CommonState> & {
  rootState: RootState
}
