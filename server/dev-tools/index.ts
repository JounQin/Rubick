import { watch } from 'chokidar'
import * as _debug from 'debug'
import * as Koa from 'koa'
import * as MFS from 'memory-fs'
import * as webpack from 'webpack'
import * as webpackDevMiddleware from 'webpack-dev-middleware'
import config, { paths } from '../../build/config'
import { clientConfig, serverConfig } from '../../build/webpack'
import webpackDev from './webpack-dev'
import webpackHot from './webpack-hot'

const debug = _debug('rubick:server')

const readFile = (fs: MFS, file: string) => {
  try {
    return fs.readFileSync(paths.dist(file), 'utf-8')
  } catch (e) {}
}

export default (app: Koa, templatePath: string, getTemplate: any, cb: any) => {
  let bundle: any
  let clientManifest: any
  let fs: any
  let template: any
  let ready: any

  const readyPromise = new Promise(resolve => {
    ready = resolve
  })

  const update = () => {
    if (bundle && clientManifest) {
      ready()
      cb(bundle, {
        fs,
        template,
        clientManifest,
      })
    }
  }

  // read template from disk and watch
  template = getTemplate(templatePath)
  watch(templatePath).on('change', () => {
    template = getTemplate(templatePath)
    debug('pug template updated.')
    update()
  })

  const clientCompiler = webpack(clientConfig)

  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: config.publicPath,
    quiet: config.quiet,
    noInfo: config.quiet,
    lazy: false,
    stats: config.stats,
  })

  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(console.error)
    stats.warnings.forEach(console.warn)
    if (stats.errors.length) {
      return
    }

    fs = (devMiddleware as any).fileSystem
    clientManifest = JSON.parse(readFile(fs, 'vue-ssr-client-manifest.json'))
    update()
  })

  app.use(webpackDev(clientCompiler, devMiddleware))
  app.use(webpackHot(clientCompiler))

  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) {
      throw err
    }
    stats = stats.toJson()
    if ((stats as any).errors.length) {
      return
    }

    // read bundle generated by vue-ssr-webpack-plugin
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}
