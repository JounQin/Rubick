import { NextHandleFunction } from 'connect'
import * as http from 'http'

// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default (
  fn: NextHandleFunction,
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const originalEnd = res.end

  return new Promise(resolve => {
    res.end = function() {
      originalEnd.apply(this, arguments)
      resolve(false)
    }

    fn(req, res, () => resolve(true))
  })
}
