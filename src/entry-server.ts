import _axios from 'axios'
import { createTranslator } from 'vue-translator'

import { routeTitle } from 'plugins'
import { Locale, ServerContext } from 'types'
import { INCORRECT_AUTHENTICATION_CREDENTIALS } from 'utils'

import createApp from './app'

export default (context: ServerContext) =>
  new Promise(async (resolve, reject) => {
    const start: boolean | number = __DEV__ && Date.now()

    const { ctx } = context

    const axios = (context.axios = _axios.create({ headers: ctx.headers }))
    const $t = (context.translator = createTranslator({
      defaultLocale: Locale.EN,
      locale: context.locale,
    }))

    axios.interceptors.response.use(
      response => response,
      e => {
        const { data, headers } = e.response

        ctx.set(headers)

        reject(
          data.code === INCORRECT_AUTHENTICATION_CREDENTIALS
            ? { status: 401 }
            : data,
        )
      },
    )

    const { app, router, store, ready } = createApp(axios, ctx)

    const { url } = ctx
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ status: 302, url: fullPath })
    }

    ready()

    router.push(url)

    router.onReady(async () => {
      const matched = router.getMatchedComponents()

      if (!matched.length) {
        // tslint:disable-next-line:no-console
        console.error('no matched components')
        return reject({ status: 404 })
      }

      const { currentRoute: route } = router

      if (route.fullPath !== url) {
        return reject({ status: 302, url: route.fullPath })
      }

      context.title = routeTitle(route, $t)

      try {
        let promise = Promise.resolve()
        matched.forEach(({ options }: any) => {
          const { asyncData } = options || { asyncData: null }
          promise = promise.then(
            () => asyncData && asyncData({ axios, store, route }),
          )
        })
        await promise
      } catch (e) {
        return reject(e.response ? e.response.data : e)
      }

      if (__DEV__) {
        // tslint:disable-next-line:no-console
        console.log(`data pre-fetch: ${Date.now() - (start as number)}ms`)
      }
      context.state = store.state
      resolve(app)
    }, reject)
  })
