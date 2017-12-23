import * as _debug from 'debug'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as nodeExternals from 'webpack-node-externals'

import { globals, paths } from '../config'

import baseConfig from './base'

const { NODE_ENV } = globals

const debug = _debug('rubick:webpack:client')

debug(`create webpack configuration for NODE_ENV:${NODE_ENV}`)

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
  externals: nodeExternals(),
  plugins: [new webpack.optimize.UglifyJsPlugin({ comments: false })],
})
