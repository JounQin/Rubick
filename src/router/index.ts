import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home'

Vue.use(VueRouter)

export default () => new VueRouter({
  mode: 'history',
  fallback: false,
  routes: [{
    path: '/',
    component: Home
  }]
})
