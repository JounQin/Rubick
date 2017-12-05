import { AxiosInstance } from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import { RootState } from 'types'
import createModules from './modules'

Vue.use(Vuex)

export default (axios: AxiosInstance) =>
  new Vuex.Store<RootState>({
    strict: __DEV__,
    modules: createModules(axios),
  })
