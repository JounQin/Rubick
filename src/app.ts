import { AxiosInstance } from 'axios'
import { Context } from 'koa'
import { Component, Vue } from 'vue-property-decorator'

import 'plugins'
import 'styles/app.scss'

import App from './views/App.vue'

import createRouter from './router'
import createStore from './store'

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
])

export default (axios: AxiosInstance, ctx?: Context) => {
  const store = createStore(axios, ctx)
  const router = createRouter()

  const ready = () => {
    router.beforeEach(async (to, from, next) => {
      if (to.matched.some(route => route.meta.auth)) {
        const { common } = store.state

        if (!common.checked) {
          await store.dispatch('loginCheck')
        }

        if (!common.user.namespace) {
          next({
            path: '/login',
            replace: true,
            query: {
              next: to.fullPath,
            },
          })
          return
        }
      }

      next()
    })
  }

  if (!ctx && !window.__INITIAL_STATE__) {
    ready()
  }

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  return { app, router, store, ready }
}
