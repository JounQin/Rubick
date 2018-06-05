import { ActionTree, GetterTree, MutationTree } from 'vuex'

import { CommonState, Profile, Region, RootState, User } from 'types'
import { REGION_COOKIE, setCookie } from 'utils'

enum TYPES {
  SET_USER = 'SET_USER',
  SET_CHECKED = 'SET_CHECKED',
  SET_PROFILE = 'SET_PROFILE',
  SET_REGIONS = 'SET_REGIONS',
  SET_REGION_ID = 'SET_REGION_ID',
}

const state = (): CommonState => ({
  user: null,
  regionId: null,
})

const getters: GetterTree<CommonState, RootState> = {
  username: ({ user }) => user && user.username,
  namespace: ({ user }) => user && user.namespace,
  region: ({ regions, regionId }) =>
    regions && regions.find(({ id }) => id === regionId),
  regionName(_s, g) {
    return g.region && g.region.name
  },
}

const actions: ActionTree<CommonState, RootState> = {
  async loginCheck({ dispatch, rootState }) {
    const { data: user } = await rootState.http.get('/login')
    dispatch('setUser', user)
  },
  setUser({ commit }, user: User) {
    commit(TYPES.SET_CHECKED, true)
    commit(TYPES.SET_USER, user)
  },
  setRegionId({ commit }, regionId: string) {
    commit(TYPES.SET_REGION_ID, regionId)
  },
  async fetchCommon({ commit, getters: g, rootState }) {
    const {
      data: { regions, profile },
    } = await rootState.http.get('/common')
    commit(TYPES.SET_PROFILE, profile)

    commit(TYPES.SET_REGIONS, regions)

    if (!g.region) {
      commit(TYPES.SET_REGION_ID, regions[0] && regions[0].id)
    }
  },
  async logout({ commit, rootState }) {
    await rootState.http.get('/logout')
    commit(TYPES.SET_USER, null)
    commit(TYPES.SET_REGIONS, null)
    commit(TYPES.SET_REGION_ID, null)
  },
}

const mutations: MutationTree<CommonState> = {
  [TYPES.SET_CHECKED](s, checked: boolean) {
    s.checked = checked
  },
  [TYPES.SET_USER](s, user: User) {
    s.user = user
  },
  [TYPES.SET_PROFILE](s, profile: Profile) {
    s.profile = profile
  },
  [TYPES.SET_REGIONS](s, regions: Region[]) {
    s.regions = regions
  },
  [TYPES.SET_REGION_ID](s, regionId: string) {
    s.regionId = regionId
    if (!__SERVER__) {
      setCookie(REGION_COOKIE, regionId, regionId ? Infinity : -1, '/')
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
