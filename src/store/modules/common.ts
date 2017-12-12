import { AxiosInstance } from 'axios'
import { Context } from 'koa'
import { Store } from 'vuex'

import { CommonState, Profile, User } from 'types'

enum TYPES {
  SET_USER = 'SET_USER',
  SET_CHECKED = 'SET_CHECKED',
  SET_PROFILE = 'SET_PROFILE',
  SET_REGIONS = 'SET_REGIONS',
}

export default (axios: AxiosInstance, ctx?: Context) => {
  const state: CommonState = { user: {} as User }

  const actions = {
    async loginCheck({ dispatch }: Store<CommonState>) {
      const { data: user } = await axios.get('/login')
      dispatch('setUser', user)
    },
    setUser({ commit }: Store<CommonState>, user: User) {
      commit(TYPES.SET_CHECKED, true)
      commit(TYPES.SET_USER, user)
    },
    async fetchCommon({ commit }: Store<CommonState>) {
      const { data: { regions, profile } } = await axios.get('/common')
      commit(TYPES.SET_PROFILE, profile)
      commit(TYPES.SET_REGIONS, regions)
    },
  }

  const mutations = {
    [TYPES.SET_CHECKED](s: CommonState, checked: boolean) {
      s.checked = checked
    },
    [TYPES.SET_USER](s: CommonState, user: User) {
      s.user = user
    },
    [TYPES.SET_PROFILE](s: CommonState, profile: Profile) {
      s.profile = profile
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
