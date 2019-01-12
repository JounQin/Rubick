import fs from 'fs'
import path from 'path'

import acceptLanguage from 'accept-language'
import _debug from 'debug'
import Koa, { Middleware } from 'koa'
import proxy from 'koa-better-http-proxy'
import compose from 'koa-compose'
import compress from 'koa-compress'
import logger from 'koa-logger'
import session from 'koa-session'
import serve from 'koa-static'
import staticCache from 'koa-static-cache'
import LruCache from 'lru-cache'
import mkdirp from 'mkdirp'
import re from 'path-to-regexp'
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer'

import koaPkg from 'koa/package.json'
import vuePkg from 'vue/package.json'

import { ACCEPT_LANGUAGE, ENV, getEnv, MODE, SESSION_CONFIG } from 'commons'
import { Locale } from 'types'
import { INFINITY_DATE, LOCALE_COOKIE } from 'utils'

import {
  getDllFile,
  publicPath,
  resolve,
  runtimeRequire,
  serverHost,
  serverPort,
} from '../build/config'

import startRouter from './router'

acceptLanguage.languages([Locale.ZH, Locale.EN])

const debug = _debug('rubick:server')

const dllScript = `<script src="${publicPath}${getDllFile()}"></script>`

const template =
  process.env.NODE_ENV === 'development'
    ? // tslint:disable-next-line:no-var-requires
      require('pug').renderFile(resolve('server/template.pug'), {
        pretty: true,
      })
    : fs.readFileSync(resolve('dist/template.html'), 'utf-8')

const app = new Koa()

app.keys = getEnv(ENV.APP_KEYS, MODE.STR_ARR)

app.use(compose([logger(), compress(), session(SESSION_CONFIG, app)]))

if (process.env.NODE_ENV === 'development') {
  app.use(
    proxy(serverHost, {
      port: serverPort + 1,
      preserveReqSession: true,
      filter: ctx => ctx.url.startsWith('/api'),
    }),
  )
} else {
  startRouter(app)
}

let renderer: BundleRenderer
let readyPromise: Promise<void>
let mfs: typeof fs

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createRenderer = (bundle: object, options: object) =>
  createBundleRenderer(bundle, {
    ...options,
    template,
    inject: false,
    cache: new LruCache({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    basedir: resolve('dist/static'),
    runInNewContext: false,
  })

if (process.env.NODE_ENV === 'development') {
  const {
    readyPromise: ready,
    webpackMiddlewarePromise,
    // tslint:disable-next-line:no-var-requires
  } = require('./dev').default(
    ({ bundle, clientManifest, fs: memoryfs }: any) => {
      renderer = createRenderer(bundle, { clientManifest })
      mfs = memoryfs
    },
  )
  readyPromise = ready
  webpackMiddlewarePromise.then((webpackMiddleware: Middleware) =>
    app.use(webpackMiddleware),
  )
} else {
  mfs = fs

  renderer = createRenderer(
    runtimeRequire(resolve('dist/vue-ssr-server-bundle.json')),
    {
      clientManifest: runtimeRequire(
        resolve('dist/vue-ssr-client-manifest.json'),
      ),
    },
  )

  const files: staticCache.Files = {}

  app
    .use(
      serve('dist/static', {
        defer: true,
      }),
    )
    .use(
      staticCache(
        'dist/static',
        {
          maxAge: 60 * 60 * 24 * 365,
        },
        files,
      ),
    )

  files['/service-worker.js'].maxAge = 0
}

const koaVersion = koaPkg.version
const vueVersion = vuePkg.version

const INDEX_PAGE = '__non-ssr-page__.html'

const DEFAULT_HEADERS = {
  'Content-Type': 'text/html',
  Server: `koa/${koaVersion}; vue-server-renderer/${vueVersion}`,
}

const NON_SSR_PATTERN = getEnv(ENV.NON_SSR_PATTERN, MODE.STR_ARR)
const STATIC_PATTERN = getEnv(ENV.STATIC_PATTERN, MODE.STR_ARR)

app.use(async (ctx, next) => {
  if (
    ctx.method !== 'GET' ||
    ctx.body != null ||
    ctx.status !== 404 ||
    /(^\/api\/)|(\.[a-z]{2,4}\d?$)/.test(ctx.path)
  ) {
    return next()
  }

  await readyPromise

  const originalLocale = ctx.cookies.get(LOCALE_COOKIE)

  const locale = originalLocale || acceptLanguage.get(ctx.get(ACCEPT_LANGUAGE))

  if (!originalLocale) {
    ctx.cookies.set(LOCALE_COOKIE, locale, {
      httpOnly: false,
      path: '/',
      expires: new Date(INFINITY_DATE),
    })
  }

  ctx.set(DEFAULT_HEADERS)

  const { url } = ctx

  if (
    NON_SSR_PATTERN.find(pattern => pattern === '*' || !!re(pattern).exec(url))
  ) {
    if (process.env.NODE_ENV === 'development') {
      ctx.body = mfs.createReadStream(resolve('dist/static/' + INDEX_PAGE))
    } else {
      ctx.url = INDEX_PAGE
      await next()
    }
    return
  }

  let generateStatic: boolean
  let distPath: string

  if (
    (process.env.NODE_ENV !== 'development' ||
      getEnv(ENV.ENABLE_DEV_STATIC, MODE.BOOLEAN)) &&
    STATIC_PATTERN.find(pattern => !!re(pattern).exec(url))
  ) {
    const staticFile = url.split('?')[0].replace(/^\//, '') || 'home'
    const staticPath = `${staticFile}.${locale}.html`

    // only /tmp folder is writable in now.sh
    const isNowSh = ctx.hostname.endsWith('.now.sh')
    distPath = isNowSh
      ? path.resolve('/tmp', staticPath)
      : resolve(`dist/static/${staticPath}`)

    if (mfs.existsSync(distPath)) {
      if (process.env.NODE_ENV === 'development' || isNowSh) {
        ctx.body = mfs.createReadStream(distPath)
      } else {
        ctx.url = staticPath
        await next()
      }

      debug(`using static html file "${distPath}"`)

      return
    }

    generateStatic = true
  }

  const start = Date.now()

  const context = { ctx, locale, dllScript }

  let html = ''

  ctx.respond = false
  ctx.status = 200

  const { res } = ctx

  const stream = renderer
    .renderToStream(context)
    .on('error', (e: { status: number; url: string } & Error) => {
      switch ((ctx.status = e.status || 500)) {
        case 302:
          ctx.set({ Location: e.url })
          return res.end()
        case 401:
          ctx.redirect(`/login?next=${url}`)
          return res.end()
        case 404:
          return res.end('404 | Page Not Found')
        default:
          res.end('500 | Internal Server Error')
          debug(`error during render : ${url}`)
          debug(e.stack)
      }
    })
    .on('end', () => {
      if (html) {
        try {
          mkdirp.sync(path.dirname(distPath), { fs: mfs })
          mfs.writeFileSync(distPath, html)
          debug(`static html file "${distPath}" is generated`)
        } catch (e) {
          debug(e)
        }
      }

      debug(`whole request: ${Date.now() - start}ms`)
    })

  if (generateStatic) {
    stream.on('data', data => (html += data))
  }

  stream.pipe(res)
})

app.listen(serverPort, serverHost, () =>
  debug('Server is now running at %s:%s.', serverHost, serverPort),
)
