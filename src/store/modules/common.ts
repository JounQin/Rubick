import { AxiosInstance } from 'axios'
import { Context } from 'koa'
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex'

import { CommonState, Profile, Region, RootState, User } from 'types'
import { REGION_COOKIE, getCookie, setCookie } from 'utils'

enum TYPES {
  SET_USER = 'SET_USER',
  SET_CHECKED = 'SET_CHECKED',
  SET_PROFILE = 'SET_PROFILE',
  SET_REGIONS = 'SET_REGIONS',
  SET_REGION_ID = 'SET_REGION_ID',
}

export default (
  axios: AxiosInstance,
  ctx?: Context,
): Module<CommonState, RootState> => {
  const state: CommonState = {
    user: null,
    regionId: ctx ? ctx.cookies.get(REGION_COOKIE) : getCookie(REGION_COOKIE),
  }

  const getters: GetterTree<CommonState, RootState> = {
    username: ({ user }) => user && user.username,
    namespace: ({ user }) => user && user.namespace,
    region: ({ regions, regionId }) =>
      regions && regions.find(({ id }) => id === regionId),
    regionName(s, g) {
      return g.region && g.region.name
    },
  }

  const actions: ActionTree<CommonState, RootState> = {
    async loginCheck({ dispatch }) {
      const { data: user } = await axios.get('/login')
      dispatch('setUser', user)
    },
    setUser({ commit }, user: User) {
      commit(TYPES.SET_CHECKED, true)
      commit(TYPES.SET_USER, user)
    },
    setRegionId({ commit }, regionId: string) {
      commit(TYPES.SET_REGION_ID, regionId)
    },
    async fetchCommon({ commit, getters: g }) {
      const { data: { regions, profile } } = await axios.get('/common')
      commit(TYPES.SET_PROFILE, profile)

      commit(TYPES.SET_REGIONS, regions)

      if (!g.region) {
        commit(TYPES.SET_REGION_ID, regions[0] && regions[0].id)
      }
    },
    async logout({ commit }) {
      await axios.get('/logout')
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
      if (!ctx) {
        setCookie(REGION_COOKIE, regionId, regionId ? Infinity : -1, '/')
      }
    },
  }

  return {
    state,
    getters,
    actions,
    mutations,
  }
}
