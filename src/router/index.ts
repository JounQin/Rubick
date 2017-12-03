import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default () =>
  new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        component: () => import('views/Home.vue'),
      },
      {
        path: '/landing',
        component: () => import('views/landing/Landing.vue'),
        children: [
          {
            name: 'login',
            path: '/login/:type(account)?',
            component: () => import('views/landing/Login.vue'),
          },
        ],
      },
    ],
  })
