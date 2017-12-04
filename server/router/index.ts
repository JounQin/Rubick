import * as _debug from 'debug'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

import config from '../../build/config'

import { injectAllRoutes } from '../decorators'

import './landing.controller'

const debug = _debug('rubick:server')

const router = new KoaRouter({
  prefix: '/api',
})

injectAllRoutes(router)

const app = new Koa()

app.use(router.routes()).use(router.allowedMethods())

const { serverHost, serverPort } = config

app.listen(serverPort + 1, serverHost, () => {
  debug('Router server is now running at %s:%s.', serverHost, serverPort + 1)
})
