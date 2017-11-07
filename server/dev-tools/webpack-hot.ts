import * as _debug from 'debug'
import * as webpackHotMiddleware from 'webpack-hot-middleware'
import applyExpressMiddleware from './apply-express-middleware'

const debug = _debug('rubick:webpack-hmr')

export default compiler => {
  debug('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = webpackHotMiddleware(compiler, {heartbeat: 5000})

  return async (ctx, next) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res)
    if (hasNext && next) {
      await next()
    }
  }
}
