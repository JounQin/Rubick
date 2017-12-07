import axios from 'axios'
import Vue, { ComponentOptions } from 'vue'

import createApp from './app'

const { app, router, store, prepare, ready } = createApp(axios)

const { __INITIAL_STATE__: initialState } = window

const routerReady = () => {
  ready()

  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

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
          activated.map(
            ({ asyncData }: ComponentOptions<Vue>) =>
              asyncData &&
              asyncData({
                store,
                route: to,
              }),
          ),
        )
      } catch (e) {}
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
  ;(async () => {
    try {
      await prepare()
    } finally {
      routerReady()
    }
  })()
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
