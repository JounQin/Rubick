import * as _debug from 'debug'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as compose from 'koa-compose'
import * as KoaRouter from 'koa-router'
import * as session from 'koa-session'

import { serverHost, serverPort } from '../../build/config'

import {
  API_PREFIX,
  ENV,
  MODE,
  SESSION_CONFIG,
  getEnv,
  jakiro,
} from './commons'
import { injectAllRoutes } from './decorators'

import './controllers'

const debug = _debug('rubick:server')

const router = new KoaRouter({
  prefix: API_PREFIX,
})

injectAllRoutes(router)

export default (app?: Koa) => {
  const provided = !!app

  const middlewares: Koa.Middleware[] = [
    bodyParser(),
    router.routes(),
    router.allowedMethods(),
    async (ctx, next) => {
      if (
        !ctx.matched.length &&
        /^\/api/.test(ctx.url) &&
        !/\.[a-z]{2-4}\d?$/.test(ctx.path)
      ) {
        try {
          const { result } = await jakiro({ ctx })
          ctx.body = result
        } catch ({ result, status }) {
          ctx.body = result
          ctx.status = status
        }
      }

      await next()
    },
  ]

  if (!app) {
    app = new Koa()
    app.keys = getEnv(ENV.APP_KEYS, MODE.STR_ARR)
    middlewares.unshift(session(SESSION_CONFIG, app))
  }

  app.use(compose(middlewares))

  if (provided) {
    return
  }

  app.listen(serverPort + 1, serverHost, () => {
    debug('Router server is now running at %s:%s.', serverHost, serverPort + 1)
  })
}
