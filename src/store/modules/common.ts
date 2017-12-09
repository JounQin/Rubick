import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

import { CommonState, User } from 'types'

enum TYPES {
  SET_USER = 'SET_USER',
  SET_REGIONS = 'SET_REGIONS',
}

export default (axios: AxiosInstance) => {
  const state: CommonState = { user: {} as User }

  const actions = {
    async commonCheck({ commit }: Store<CommonState>) {
      const { data: { user, regions } } = await axios.get('/common')
      commit(TYPES.SET_USER, user)
      commit(TYPES.SET_REGIONS, regions)
    },
    setUser({ commit }: Store<CommonState>, user: User) {
      commit(TYPES.SET_USER, user)
    },
  }

  const mutations = {
    [TYPES.SET_USER](s: CommonState, user: User) {
      s.user = user
    },
    [TYPES.SET_REGIONS](s: CommonState, regions: any[]) {
      s.regions = regions
    },
  }

  return {
    state,
    actions,
    mutations,
  }
}
