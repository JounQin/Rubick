/* tslint:disable:no-console no-var-requires */
import * as fs from 'fs'
import * as path from 'path'

import acceptLanguage from 'accept-language'
import * as _debug from 'debug'
import { minify } from 'html-minifier'
import * as Koa from 'koa'
import * as proxy from 'koa-better-http-proxy'
import * as compress from 'koa-compress'
import * as logger from 'koa-logger'
import * as serve from 'koa-static'
import * as lruCache from 'lru-cache'
import * as mkdirp from 'mkdirp'
import * as re from 'path-to-regexp'
import * as pug from 'pug'
import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer'

import * as koaPkg from 'koa/package.json'
import * as vuePkg from 'vue/package.json'

import { ACCEPT_LANGUAGE, ENV, MODE, getEnv } from 'commons'
import { LOCALE } from 'types'
import { LOCALE_COOKIE } from 'utils'

import config, { globals, paths } from '../build/config'
import startRouter from './router'

acceptLanguage.languages([LOCALE.ZH, LOCALE.EN])

const minimize = !config.devTool
const { __DEV__ } = globals

const debug = _debug('rubick:server')

const { serverHost, serverPort } = config

const getTemplate = (tempPath: string) => {
  const tpl = pug.render(fs.readFileSync(tempPath, 'utf-8'), {
    pretty: minimize,
    polyfill: !__DEV__,
  })

  return minimize
    ? minify(tpl, {
        collapseWhitespace: true,
        minifyJS: true,
      })
    : tpl
}

const app = new Koa()

app.use(compress()).use(logger())

if (__DEV__) {
  app.use(
    proxy(serverHost, {
      port: serverPort + 1,
      filter: ctx => ctx.url.startsWith('/api'),
    }),
  )
} else {
  startRouter(app)
}

let renderer: BundleRenderer
let readyPromise: Promise<any>
let mfs: any

const templatePath = paths.server('template.pug')

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createRenderer = (bundle: object, options: object) =>
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
    (bundle: object, { clientManifest, fs: memoryfs, template }: any) => {
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
  app.use(
    serve('dist', {
      defer: true,
      maxage: 1000 * 3600 * 24 * 365,
    }),
  )
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
    return
  }

  await readyPromise

  const originalLocale = ctx.cookies.get(LOCALE_COOKIE)

  const locale = originalLocale || acceptLanguage.get(ctx.get(ACCEPT_LANGUAGE))

  if (!originalLocale) {
    ctx.cookies.set(LOCALE_COOKIE, locale)
  }

  ctx.set(DEFAULT_HEADERS)

  const { url } = ctx

  if (NON_SSR_PATTERN.find(pattern => !!re(pattern).exec(url))) {
    if (__DEV__) {
      ctx.body = mfs.createReadStream(paths.dist(INDEX_PAGE))
    } else {
      ctx.url = INDEX_PAGE
      await next()
    }
    return
  }

  let generateStatic: boolean
  let distPath: string

  if (
    (!__DEV__ || getEnv(ENV.ENABLE_DEV_STATIC, MODE.BOOLEAN)) &&
    STATIC_PATTERN.find(pattern => !!re(pattern).exec(url))
  ) {
    const staticFile = url.split('?')[0].replace(/^\//, '') || 'home'
    const staticPath = `static/${staticFile}.${locale}.html`

    // only /tmp folder is writable in now.sh
    const isNowSh = ctx.hostname.endsWith('.now.sh')
    distPath = isNowSh
      ? path.resolve('/tmp', staticPath)
      : paths.dist(staticPath)

    if (mfs.existsSync(distPath)) {
      if (__DEV__ || isNowSh) {
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

  const context = { ctx, locale, title: 'Rubick' }

  let html = ''

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
      if (html) {
        try {
          mkdirp.sync(path.dirname(distPath), { fs: mfs })
          mfs.writeFileSync(distPath, html)
          debug(`static html file "${distPath}" is generated`)
        } catch (e) {
          console.error(e)
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
