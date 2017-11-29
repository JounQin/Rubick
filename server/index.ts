/* tslint:disable:no-console no-var-requires */
import * as fs from 'fs'

import * as _debug from 'debug'
import { minify } from 'html-minifier'
import * as App from 'koa'
import * as compress from 'koa-compress'
import * as logger from 'koa-logger'
import * as serve from 'koa-static'
import * as lruCache from 'lru-cache'
import * as pug from 'pug'
import { createBundleRenderer } from 'vue-server-renderer'

import config, { globals, paths } from '../build/config'

const { __DEV__ } = globals

import router from './router'

const debug = _debug('rubick:server')

const getTemplate = (path: string) => {
  const tpl = pug.render(fs.readFileSync(path, 'utf-8'), {
    pretty: !config.minimize,
    polyfill: !__DEV__,
  })

  return config.minimize
    ? minify(tpl, {
        collapseWhitespace: true,
        minifyJS: true,
      })
    : tpl
}

const app = new App()

app.use(compress()).use(logger())

router(app)

let renderer: any
let readyPromise: any
let mfs: any

const templatePath = paths.server('template.pug')

const koaVersion = require('koa/package.json').version
const vueVersion = require('vue-server-renderer/package.json').version

const DEFAULT_HEADERS = {
  'Content-Type': 'text/html',
  Server: `koa/${koaVersion}; vue-server-renderer/${vueVersion}`,
}

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createRenderer = (bundle: any, options: object) =>
  createBundleRenderer(bundle, {
    ...options,
    inject: false,
    cache: lruCache({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    basedir: paths.dist(),
    runInNewContext: false,
  })

if (__DEV__) {
  readyPromise = require('./dev-tools').default(
    app,
    templatePath,
    getTemplate,
    (bundle: any, { clientManifest, fs: memoryfs, template }: any) => {
      renderer = createRenderer(bundle, { clientManifest, template })
      mfs = memoryfs
    },
  )
} else {
  mfs = fs
  renderer = createRenderer(require(paths.dist('vue-ssr-server-bundle.json')), {
    clientManifest: require(paths.dist('vue-ssr-client-manifest.json')),
    template: getTemplate(templatePath),
  })
  app.use(serve('dist'))
}

app.use(async (ctx, next) => {
  await readyPromise

  ctx.set(DEFAULT_HEADERS)

  const { url } = ctx

  const start = Date.now()

  const context = { ctx, title: 'Rubick' }

  ctx.respond = false
  ctx.status = 200

  const { res } = ctx

  const stream = renderer
    .renderToStream(context)
    .on('error', (e: { status: number; url: string; stack: any }) => {
      switch ((ctx.status = e.status || 500)) {
        case 302:
          ctx.redirect(e.url)
          return res.end()
        case 404:
          return res.end('404 | Page Not Found')
        default:
          res.end('500 | Internal Server Error')
          console.error(`error during render : ${url}`)
          console.error(e.stack)
      }
    })
    .on('end', () => {
      debug(`whole request: ${Date.now() - start}ms`)
    })

  stream.pipe(res)
})

const { serverHost, serverPort } = config

app.listen(serverPort, serverHost, () =>
  debug('Server is now running at %s:%s.', serverHost, serverPort),
)
