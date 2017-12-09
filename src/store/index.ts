import { AxiosInstance } from 'axios'
import { Context } from 'koa'
import Vue from 'vue'
import Vuex from 'vuex'

import { RootState } from 'types'
import createModules from './modules'

Vue.use(Vuex)

export default (axios: AxiosInstance, ctx?: Context) =>
  new Vuex.Store<RootState>({
    strict: __DEV__,
    modules: createModules(axios, ctx),
  })
