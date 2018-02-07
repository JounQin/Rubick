import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

import { __DEV__, resolve } from './config'

import baseConfig from './base'

const dllConfig = merge.smart(baseConfig, {
  entry: {
    vendors: [
      'axios',
      'regenerator-runtime',
      'v-tooltip',
      'vue',
      'vue-class-component',
      'vue-property-decorator',
      'vue-router',
      'vue-translator',
      'vuex',
      'vuex-class',
    ],
  },
  output: {
    filename: '[name].dll.[hash].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DllPlugin({
      context: resolve(),
      path: resolve('dist/[name].dll.manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
})

if (!__DEV__) {
  dllConfig.plugins.push(
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
    }),
  )
}

export default dllConfig
