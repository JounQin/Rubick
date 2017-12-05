import Vue from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

Vue.use(VueRouter)

export default (store: Store<any>) => {
  const router = new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        component: () => import('views/Home.vue'),
        meta: {
          auth: true,
        },
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

  return router
}
