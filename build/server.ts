import * as fs from 'fs'

import * as webpack from 'webpack'
import * as nodeExternals from 'webpack-node-externals'

import { resolve } from './config'

import baseConfig from './base'

const lernaModulesDir = resolve('../../node_modules')

const config: webpack.Configuration = {
  ...baseConfig,
  entry: resolve('server/index.ts'),
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [resolve('src'), resolve('server/router'), 'node_modules'],
  },
  output: {
    path: resolve('dist'),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeExternals({
    modulesDir: fs.existsSync(lernaModulesDir)
      ? lernaModulesDir
      : 'node_modules',
  }),
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  ],
}

export default config
