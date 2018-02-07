import * as _debug from 'debug'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import * as VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import * as webpack from 'webpack'
import * as merge from 'webpack-merge'

import { NODE_ENV, __DEV__, getDllFile, resolve } from './config'

import baseConfig from './base'

const VUE_ENV = 'client'

const debug = _debug('rubick:webpack:client')

debug(
  `create webpack configuration for NODE_ENV:${NODE_ENV}, VUE_ENV:${VUE_ENV}`,
)

const clientConfig = merge.smart(baseConfig, {
  entry: {
    app: [resolve('src/entry-client.ts')],
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': JSON.stringify(VUE_ENV),
      SERVER_PREFIX: JSON.stringify('/'),
      __SERVER__: JSON.stringify(false),
    }),
    new webpack.DllReferencePlugin({
      context: resolve(),
      manifest: resolve('dist/vendors.dll.manifest.json'),
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: module =>
        // a module is extracted into the vendors chunk
        // if it's inside node_modules
        /node_modules/.test(module.context) &&
        // and not a CSS file (due to extract-text-webpack-plugin limitation)
        !/\.css$/.test(module.request),
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: '__non-ssr-page__.html',
      favicon: 'src/assets/favicon.ico',
    }),
    new VueSSRClientPlugin({
      filename: '../vue-ssr-client-manifest.json',
    }),
  ],
})

if (!__DEV__) {
  debug(`Enable plugins for ${NODE_ENV} (UglifyJS, SWPrecache).`)

  clientConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({ comments: false }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'rubick',
      directoryIndex: false,
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/, /\.json$/],
      stripPrefix: resolve('dist/static').replace(/\\/g, '/'),
      runtimeCaching: [
        {
          urlPattern: '/' + getDllFile(),
          handler: 'cacheFirst',
        },
        {
          urlPattern: /\//,
          handler: 'networkFirst',
        },
      ],
    }),
  )
}

export default clientConfig
