import { AxiosInstance } from 'axios'
import Vue from 'vue'
import Vuex, { ActionContext } from 'vuex'

import { RootState } from 'types'
import modules from './modules'

Vue.use(Vuex)

const SET_HTTP = 'SET_HTTP'

const actions = {
  setHttp(
    { commit }: ActionContext<RootState, RootState>,
    axios: AxiosInstance,
  ) {
    commit(SET_HTTP, axios)
  },
}

const mutations = {
  [SET_HTTP](state: RootState, axios: AxiosInstance) {
    state.http = axios
  },
}

export default (axios: AxiosInstance) =>
  new Vuex.Store<RootState>({
    strict: __DEV__,
    state: {
      http: axios,
    } as RootState,
    actions,
    mutations,
    modules,
  })

export * from './chunks'
