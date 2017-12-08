import Vue from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'

import RouterView from './RouterView.vue'

Vue.use(VueRouter)

export default (store: Store<any>) => {
  const router = new VueRouter({
    mode: 'history',
    fallback: false,
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        path: '/console',
        component: () => import('views/console/Console.vue'),
        meta: {
          auth: true,
        },
        children: [
          {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('views/dashboard/Dashboard.vue'),
          },
          {
            name: 'container',
            path: '/container',
            component: RouterView,
            children: [
              {
                name: 'application',
                path: 'application',
                component: () => import('views/container/Application.vue'),
              },
              {
                name: 'service',
                path: 'service',
                component: () => import('views/container/Service.vue'),
              },
            ],
          },
        ],
      },
      {
        path: '/landing',
        component: () => import('views/landing/Landing.vue'),
        children: [
          {
            name: 'login',
            path: '/login/:type(account)?',
            component: () => import('views/landing/Login.vue'),
            meta: {
              title() {
                return `${this.params.type ? 'account' : 'user'}_login`
              },
            },
          },
          {
            name: 'register',
            path: '/register',
            component: () => import('views/landing/Register.vue'),
          },
          {
            name: 'forget-password',
            path: '/forget-password',
            component: () => import('views/landing/ForgetPassword.vue'),
          },
        ],
      },
    ],
  })

  return router
}
