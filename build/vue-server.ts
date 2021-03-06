import _debug from 'debug'
import VueSSRServerPlugin from 'vue-server-renderer/server-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'
import nodeExternals from 'webpack-node-externals'

import { innerServer, NODE_ENV, resolve } from './config'

import baseConfig from './base'

const VUE_ENV = 'server'

const debug = _debug('rubick:webpack:server')

debug(
  `create webpack configuration for NODE_ENV:${NODE_ENV}, VUE_ENV:${VUE_ENV}`,
)

export default merge.smart(baseConfig, {
  entry: [resolve('src/entry-server.ts')],
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
