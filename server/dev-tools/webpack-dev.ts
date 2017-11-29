import * as _debug from 'debug'
import { Context } from 'koa'
import applyExpressMiddleware from './apply-express-middleware'

const debug = _debug('rubick:webpack-dev')

export default (compiler: any, middleware: any) => {
  debug('Enable webpack dev middleware.')

  return async (ctx: Context, next: any) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end(content: any) {
        ctx.body = content
      },
      setHeader() {
        ctx.set.apply(ctx, arguments)
      },
    })

    if (hasNext) {
      await next()
    }
  }
}
