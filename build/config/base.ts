import * as path from 'path'

type ENV = 'development' | 'production'

const NODE_ENV: ENV = (process.env.NODE_ENV as ENV) || 'development'

export const globals = {
  NODE_ENV,
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  __DEV__: NODE_ENV === 'development',
  __PROD__: NODE_ENV === 'production',
}

export const paths = (() => {
  const base = (...args) => path.resolve(__dirname, '../../', ...args)

  return {
    base,
    src: base.bind(null, 'src'),
    dist: base.bind(null, 'dist'),
    server: base.bind(null, 'server'),
    test: base.bind(null, 'test'),
  }
})()

// tslint:disable-next-line no-var-requires
export const pkg = require(paths.base('package.json'))

export const alias = {}

export const vendors = [
  'axios',
  'regenerator-runtime/runtime',
  'vue',
  'vue-router',
  'vuex',
]

const serverHost = process.env.HOST || 'localhost'
const serverPort = process.env.PORT || 4000

export default {
  serverHost,
  serverPort,
  innerServer: `http://localhost:${serverPort}/`,
  browsers: ['> 1% in CN'],
  quiet: false,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
}
