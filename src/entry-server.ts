import _axios from 'axios'
import Vue, {ComponentOptions} from 'vue'

import createApp from './app'

interface Context {
  [key: string]: any
}

export default (context: Context) => new Promise((resolve, reject) => {
  const start: boolean | number = __DEV__ && Date.now()

  const {ctx} = context

  const axios = _axios.create()

  context.axios = axios

  axios.defaults.headers = ctx.headers

  const {app, router, store} = createApp(axios)

  const {url} = ctx
  const {fullPath} = router.resolve(url).route

  if (fullPath !== url) {
    return reject({status: 302, url: fullPath})
  }

  router.push(url)

  router.onReady(async () => {
    const matched = router.getMatchedComponents()

    if (!matched.length) {
      return reject({status: 404})
    }

    await Promise.all(matched.map(({asyncData}: ComponentOptions<Vue>) => asyncData && asyncData({
      store,
      route: router.currentRoute
    })))

    if (__DEV__) {
      // tslint:disable-next-line:no-console
      console.log(`data pre-fetch: ${Date.now() - (start as number)}ms`)
    }
    context.state = store.state
    resolve(app)
  }, reject)
})
