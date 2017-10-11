import Vue, {ComponentOptions} from 'vue'

import createApp from './app'

const {app, router, store} = createApp()

const {__INITIAL_STATE__: initialState} = window

const ready = () => {
  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    if (!prevMatched) {
      return next()
    }

    let diffed = false

    const activated = matched.filter((comp, index) => diffed || (diffed = (prevMatched[index] !== comp)))

    if (activated.length) {
      try {
        await Promise.all(activated.map(({asyncData}: ComponentOptions<Vue>) => asyncData && asyncData({
          store,
          route: to
        })))
      } catch (e) {
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

  router.onReady(ready)
} else {
  ready()
}

if (module.hot) {
  module.hot.accept()
}
