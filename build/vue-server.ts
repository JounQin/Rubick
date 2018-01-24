import * as path from 'path'

import * as _debug from 'debug'
import * as VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as nodeExternals from 'webpack-node-externals'

import { NODE_ENV, innerServer, resolve } from './config'

import baseConfig from './base'

const VUE_ENV = 'server'

const debug = _debug('rubick:webpack:server')

debug(
  `create webpack configuration for NODE_ENV:${NODE_ENV}, VUE_ENV:${VUE_ENV}`,
)

export default merge.smart(baseConfig, {
  entry: [
    path.resolve(__dirname, 'element.js'),
    resolve('src/entry-server.ts'),
  ],
  target: 'node',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify(VUE_ENV),
      SERVER_PREFIX: JSON.stringify(innerServer),
      __SERVER__: JSON.stringify(true),
    }),
    new VueSSRServerPlugin({
      filename: '../vue-ssr-server-bundle.json',
    }),
  ],
  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: [/\.css$/],
  }),
})
