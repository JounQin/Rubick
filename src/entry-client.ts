import axios from 'axios'

import { routeTitle } from 'plugins'
import { Locale } from 'types'
import {
  INCORRECT_AUTHENTICATION_CREDENTIALS,
  LANG,
  LOCALE_COOKIE,
  getCookie,
  setCookie,
} from 'utils'

import createApp from './app'

const { app, router, store, ready } = createApp(axios)

app.$watch('$t.locale', curr => {
  document.title = routeTitle(router.currentRoute)
  setCookie(LOCALE_COOKIE, curr, Infinity, '/')
  setDocLang(curr)
})

const { __INITIAL_STATE__: initialState } = window

const setDocLang = (locale: Locale) => {
  document.documentElement.setAttribute(LANG, locale)
}

const routerReady = () => {
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
          activated.map(({ options }: any = {}) => {
            const { asyncData } = options || { asyncData: null }
            return asyncData && asyncData({ axios, store, route: to })
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

  if (!__DEV__) {
    delete window.__INITIAL_STATE__
  }

  router.onReady(() => {
    ready()
    routerReady()
  })
} else {
  setDocLang(getCookie(LOCALE_COOKIE) as Locale)
  routerReady()
}

if (module.hot) {
  module.hot.accept()
}

if (
  !__DEV__ &&
  (location.protocol === 'https:' ||
    ['127.0.0.1', 'localhost'].includes(location.hostname)) &&
  navigator.serviceWorker
) {
  navigator.serviceWorker.register('/service-worker.js')
}
