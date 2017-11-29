import * as _debug from 'debug'
import { Context } from 'koa'
import * as webpack from 'webpack'
import * as webpackHotMiddleware from 'webpack-hot-middleware'

import applyExpressMiddleware from './apply-express-middleware'

const debug = _debug('rubick:webpack-hmr')

export default (compiler: webpack.Compiler) => {
  debug('Enable Webpack Hot Module Replacement (HMR).')

  const middleware = webpackHotMiddleware(compiler, { heartbeat: 5000 })

  return async (ctx: Context, next: () => Promise<any>) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext) {
      await next()
    }
  }
}
