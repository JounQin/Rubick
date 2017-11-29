import * as Koa from 'koa'
import * as Router from 'koa-router'

const router = new Router({ prefix: '/api' })

export default (app: Koa) =>
  app.use(router.routes()).use(router.allowedMethods())
