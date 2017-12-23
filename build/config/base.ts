import * as path from 'path'

import { Options } from 'webpack'

import * as pkg from '../../package.json'

export { pkg }

enum ENV {
  DEV = 'development',
  PROD = 'production',
}

const NODE_ENV: ENV = (process.env.NODE_ENV as ENV) || ENV.DEV

const serverHost: string = process.env.HOST || 'localhost'
const serverPort: number = +process.env.PORT || 4000

export const globals = {
  NODE_ENV,
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  __DEV__: NODE_ENV === ENV.DEV,
  __PROD__: NODE_ENV === ENV.PROD,
  NON_INDEX_REGEX: /^(?!.*[/\\](index)\.ts).*\.(ts|vue)$/.toString(),
  I18N_REGEX: /([\w-]*[\w]+)\.i18n\.json$/.toString(),
  INNER_SERVER: JSON.stringify(`http://localhost:${serverPort}/`),
  API_PREFIX: JSON.stringify('/api'),
}

export const paths = (() => {
  const base = (...args: string[]) => path.resolve(process.cwd(), ...args)

  return {
    base,
    src: base.bind(null, 'src'),
    dist: base.bind(null, 'dist'),
    server: base.bind(null, 'server'),
    test: base.bind(null, 'test'),
  }
})()

export const alias = {}

export const vendors = [
  'axios',
  'regenerator-runtime/runtime',
  'vue',
  'vue-router',
  'vue-translator',
  'vuex',
]

export interface Config {
  serverHost: string
  serverPort: number
  quiet: boolean
  stats: Options.Stats
  devTool: Options.Devtool
  publicPath: string
  hashType: 'hash' | 'chunkhash'
}

const config = {
  serverHost,
  serverPort,
  quiet: false,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  },
} as Config

export default config
