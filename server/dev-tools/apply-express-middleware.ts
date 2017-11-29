// Based on: https://github.com/dayAlone/koa-webpack-hot-middleware/blob/master/index.js
export default (fn: any, req: any, res: any) => {
  const originalEnd = res.end

  return new Promise(resolve => {
    res.end = function() {
      originalEnd.apply(this, arguments)
      resolve(false)
    }
    fn(req, res, () => {
      resolve(true)
    })
  })
}
