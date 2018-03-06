import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

import { resolve } from './config'

import baseConfig from './base'

export default merge.smart(baseConfig, {
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
