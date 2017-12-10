import axios from 'axios'

import { routeTitle, translate } from 'plugins'
import { INCORRECT_AUTHENTICATION_CREDENTIALS } from 'utils'

import createApp from './app'
;(async () => {
  const { app, router, store, ready } = await createApp(axios)

  const { __INITIAL_STATE__: initialState } = window

  const routerReady = () => {
    ready()

    translate.$watch(() => {
      document.title = routeTitle(router.currentRoute)
    })

    router.beforeResolve(async (to, from, next) => {
      const matched = router.getMatchedComponents(to)
      const prevMatched = router.getMatchedComponents(from)

      document.title = routeTitle(to)

      if (!prevMatched) {
        return next()
      }

      let diffed = false

      const activated = matched.filter(
        (comp, index) => diffed || (diffed = prevMatched[index] !== comp),
      )

      if (activated.length) {
        try {
          await Promise.all(
            activated.map(({ options }: any) => {
              const { asyncData } = options || { asyncData: null }
              return asyncData && asyncData({ store, route: to })
            }),
          )
        } catch (e) {
          const { response } = e
          if (
            response &&
            response.data.code === INCORRECT_AUTHENTICATION_CREDENTIALS
          ) {
            router.replace({
              path: '/login',
              query: {
                next: router.currentRoute.fullPath,
              },
            })
            return
          }
        }
      }

      next()
    })

    app.$mount('#app')
  }

  if (initialState) {
    store.replaceState(initialState)

    if (__PROD__) {
      delete window.__INITIAL_STATE__
    }

    router.onReady(routerReady)
  } else {
    routerReady()
  }

  if (module.hot) {
    module.hot.accept()
  }

  if (
    __PROD__ &&
    (location.protocol === 'https:' ||
      ['127.0.0.1', 'localhost'].includes(location.hostname)) &&
    navigator.serviceWorker
  ) {
    navigator.serviceWorker.register('/service-worker.js')
  }
})()
