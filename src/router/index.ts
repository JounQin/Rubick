import Vue from 'vue'
import VueRouter from 'vue-router'

import Console from './console'
import Landing from './landing'

Vue.use(VueRouter)

export default () =>
  new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      Console,
      Landing,
    ],
  })
