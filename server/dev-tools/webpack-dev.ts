import * as _debug from 'debug'
import applyExpressMiddleware from './apply-express-middleware'

const debug = _debug('rubick:webpack-dev')

export default (compiler, middleware) => {
  debug('Enable webpack dev middleware.')

  return async (ctx, next) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end(content) {
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
