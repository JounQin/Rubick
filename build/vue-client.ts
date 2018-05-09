import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
import _debug from 'debug'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
import webpack from 'webpack'
import merge from 'webpack-merge'

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
  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      name: 'vendors',
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: ({ context, request }: { context: string; request: string }) =>
            /node_modules/.test(context) && !/\.css$/.test(request),
        },
      },
    },
  },
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
    new HtmlWebpackPlugin({
      template: 'src/index.pug',
      filename: '__non-ssr-page__.html',
      favicon: 'src/assets/favicon.ico',
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve('dist/static/vendors.dll.*.js'),
      includeSourcemap: false,
    }),
    new VueSSRClientPlugin({
      filename: '../vue-ssr-client-manifest.json',
    }),
  ],
})

if (!__DEV__) {
  debug(`Enable plugins for ${NODE_ENV} (SWPrecache).`)

  clientConfig.plugins.push(
    new SWPrecacheWebpackPlugin({
      cacheId: 'rubick',
      directoryIndex: null,
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
