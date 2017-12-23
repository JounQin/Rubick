import * as fs from 'fs'

import * as _debug from 'debug'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as nodeExternals from 'webpack-node-externals'

import { globals, paths } from '../config'

import baseConfig from './base'

const { NODE_ENV } = globals

const debug = _debug('rubick:webpack:client')

debug(`create webpack configuration for NODE_ENV:${NODE_ENV}`)

const lernaModulesDir = paths.base('../node_modules')

export default merge.smart(baseConfig, {
  entry: paths.server('index.ts'),
  target: 'node',
  resolve: {
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
  plugins: [new webpack.optimize.UglifyJsPlugin({ comments: false })],
})
