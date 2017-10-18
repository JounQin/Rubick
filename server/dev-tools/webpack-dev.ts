import applyExpressMiddleware from './apply-express-middleware'
import * as _debug from 'debug'

const debug = _debug('rubick:webpack-dev')

export default (compiler, middleware) => {
  debug('Enable webpack dev middleware.')

  return async (ctx, next) => {
    let hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end(content) {
        ctx.body = content
      },
      setHeader() {
        ctx.set.apply(ctx, arguments)
      }
    })

    if (hasNext) {
      await next()
    }
  }
}
