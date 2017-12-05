import { AxiosInstance } from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

import createModules from './modules'

Vue.use(Vuex)

export default (axios: AxiosInstance) =>
  new Vuex.Store<any>({
    strict: __DEV__,
    modules: createModules(axios),
  })
