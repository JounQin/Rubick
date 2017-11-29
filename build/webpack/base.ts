import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as webpack from 'webpack'

import config, { globals, paths } from '../config'

const { __PROD__ } = globals

const webpackConfig: webpack.Configuration = {
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.ts', '.vue', '.js'],
  },
  output: {
    path: paths.dist(),
    filename: `[name].[${__PROD__ ? 'chunkhash' : 'hash'}].js`,
  },
  devtool: config.devTool,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...globals,
      SERVER_PREFIX: JSON.stringify(config.publicPath),
      INNER_SERVER: JSON.stringify(config.innerServer),
    }),
    ...(__PROD__
      ? [
          new webpack.optimize.ModuleConcatenationPlugin(),
          new ExtractTextPlugin({
            filename: 'common.[chunkhash].css',
          }),
        ]
      : [new FriendlyErrorsPlugin()]),
  ],
}

export default webpackConfig
