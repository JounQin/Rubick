import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

import { AuthState, User } from 'types'

enum TYPES {
  SET_USER = 'SET_USER',
}

export default (axios: AxiosInstance) => {
  const state: AuthState = { user: {} as User }

  const actions = {
    async checkUser({ commit }: Store<AuthState>) {
      const { data: user } = await axios.get('/login')
      commit(TYPES.SET_USER, user)
    },
    setUser({ commit }: Store<AuthState>, user: User) {
      commit(TYPES.SET_USER, user)
    },
  }

  const mutations = {
    [TYPES.SET_USER](s: AuthState, user: User) {
      s.user = user
    },
  }

  return {
    state,
    actions,
    mutations,
  }
}
