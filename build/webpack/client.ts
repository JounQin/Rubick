import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

import * as merge from 'webpack-merge'

import {paths} from '../config'

import baseConfig from './base'

export default merge.smart(baseConfig, {
  entry: {
    app: [(baseConfig.entry as webpack.Entry).app, paths.src('entry-client.ts')]
  },
  module: {
    rules: [{
      test: /\.pug$/,
      use: [{
        loader: 'raw-loader'
      }, {loader: 'pug-html-loader'}]
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors'}),
    new webpack.optimize.CommonsChunkPlugin({name: 'manifest'}),
    new HtmlWebpackPlugin({
      template: 'src/index.pug'
    })
  ]
})
