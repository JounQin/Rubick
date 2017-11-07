import * as Router from 'koa-router'

const router = new Router({prefix: '/api'})

export default app => app.use(router.routes()).use(router.allowedMethods())
