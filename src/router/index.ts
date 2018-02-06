import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const RouterView = (name: string) =>
  Vue.extend({
    name: `Route${name}`,
    render: h => h('router-view'),
  })

export default () =>
  new VueRouter({
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
            component: RouterView('Container'),
            redirect: '/application',
            children: [
              {
                name: 'application',
                path: '/application',
                component: () =>
                  import('views/container/application/Application.vue'),
              },
              {
                name: 'service',
                path: '/service',
                component: () => import('views/container/service/Service.vue'),
              },
            ],
          },
          {
            name: 'image',
            path: '/image',
            component: RouterView('Image'),
            redirect: '/image-repository',
            children: [
              {
                name: 'image-repository',
                path: '/image-repository',
                component: () =>
                  import('views/image/image-repository/ImageRepository.vue'),
              },
              {
                name: 'sync-center',
                path: '/sync-center',
                component: () =>
                  import('views/image/sync-center/SyncCenter.vue'),
              },
              {
                name: 'sync-history',
                path: '/sync-history',
                component: () =>
                  import('views/image/sync-history/SyncHistory.vue'),
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
