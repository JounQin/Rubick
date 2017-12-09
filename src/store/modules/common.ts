import { AxiosInstance } from 'axios'
import { Context } from 'koa'
import { Store } from 'vuex'

import { CommonState, User } from 'types'
import { INCORRECT_AUTHENTICATION_CREDENTIALS } from 'utils'

enum TYPES {
  SET_INVALID = 'SET_INVALID',
  SET_USER = 'SET_USER',
  SET_REGIONS = 'SET_REGIONS',
}

export default (axios: AxiosInstance, ctx?: Context) => {
  const state: CommonState = { invalid: false, user: {} as User, regions: null }

  const actions = {
    async commonCheck({ commit }: Store<CommonState>) {
      try {
        const { data: { user, regions } } = await axios.get('/common')
        commit(TYPES.SET_USER, user)
        commit(TYPES.SET_REGIONS, regions)
      } catch ({ response: { data: { code }, headers } }) {
        if (code === INCORRECT_AUTHENTICATION_CREDENTIALS) {
          commit(TYPES.SET_INVALID)
        }
        if (ctx) {
          ctx.set(headers)
        }
      }
    },
    setUser({ commit }: Store<CommonState>, user: User) {
      commit(TYPES.SET_USER, user)
    },
  }

  const mutations = {
    [TYPES.SET_INVALID](s: CommonState) {
      s.invalid = true
    },
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
