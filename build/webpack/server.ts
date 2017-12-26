import * as fs from 'fs'

import * as webpack from 'webpack'
import * as nodeExternals from 'webpack-node-externals'

import { paths } from '../config'

import baseConfig from './base'

const lernaModulesDir = paths.base('../../node_modules')

const config: webpack.Configuration = {
  ...baseConfig,
  entry: paths.server('index.ts'),
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [paths.src(), paths.server('router'), 'node_modules'],
  },
  output: {
    path: paths.dist(),
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
