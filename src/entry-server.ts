import axios from 'axios'
import Vue, { ComponentOptions } from 'vue'

import { routeTitle, translate } from 'plugins'
import { ServerContext } from 'types'

import createApp from './app'

export default (context: ServerContext) =>
  new Promise(async (resolve, reject) => {
    const start: boolean | number = __DEV__ && Date.now()

    const { ctx } = context

    const $t = translate.create(context.locale)

    Object.assign(context, {
      axios: axios.create({
        headers: ctx.headers,
      }),
      translate: $t,
    })

    const { app, router, store, prepare, ready } = createApp(context.axios, ctx)

    const { url } = ctx
    const { fullPath } = router.resolve(url).route

    if (fullPath !== url) {
      return reject({ status: 302, url: fullPath })
    }

    try {
      await prepare()

      if (store.state.common.invalid && /^\/login$/.test(ctx.path)) {
        return reject({ status: 401 })
      }
    } catch (e) {
      return reject(e)
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
        await Promise.all(
          matched.map(
            ({ asyncData }: ComponentOptions<Vue>) =>
              asyncData &&
              asyncData({
                store,
                route,
              }),
          ),
        )
      } catch (e) {
        return reject(e)
      }

      if (__DEV__) {
        // tslint:disable-next-line:no-console
        console.log(`data pre-fetch: ${Date.now() - (start as number)}ms`)
      }
      context.state = store.state
      resolve(app)
    }, reject)
  })
