import { NextHandleFunction } from 'connect'
import * as _debug from 'debug'
import * as http from 'http'
import { Context } from 'koa'
import { Compiler } from 'webpack'

import applyExpressMiddleware from './apply-express-middleware'

const debug = _debug('rubick:webpack-dev')

export default (compiler: Compiler, middleware: NextHandleFunction) => {
  debug('Enable webpack dev middleware.')

  return async (ctx: Context, next: any) => {
    const hasNext = await applyExpressMiddleware(middleware, ctx.req, {
      end(content: any) {
        ctx.body = content
      },
      setHeader(name: string, value: string) {
        ctx.set(name, value)
      },
    } as http.ServerResponse)

    if (hasNext) {
      await next()
    }
  }
}
