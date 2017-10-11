import * as webpack from 'webpack'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import config, {globals, paths, vendors} from '../config'

const {__PROD__} = globals

const webpackConfig: webpack.Configuration = {
  entry: {
    app: 'regenerator-runtime/runtime',
    vendors
  },
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.ts', '.vue', '.js']
  },
  output: {
    path: paths.dist(),
    filename: `[name].[${__PROD__ ? 'chunkhash' : 'hash'}].js`
  },
  devtool: config.devTool,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(globals),
    ...__PROD__ ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false}
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      })
    ] : [
      new FriendlyErrorsPlugin()
    ]
  ]
}

export default webpackConfig
