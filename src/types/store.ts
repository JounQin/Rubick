export interface User {
  namespace: string
  username?: string
  email?: string
  token?: string
}

export interface Region {
  id: string
  name: string
}

export interface CommonState {
  user: User
  regions: Region[]
}
export interface RootState {
  common: CommonState
}
