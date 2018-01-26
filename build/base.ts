import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as webpack from 'webpack'

import { __DEV__, publicPath, resolve } from './config'

const minimize = !__DEV__
const sourceMap = __DEV__

const SCSS_LOADERS = ExtractTextPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: {
        minimize: minimize && {
          discardComments: {
            removeAll: true,
          },
        },
        sourceMap,
      },
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap },
    },
    {
      loader: 'resolve-url-loader',
      options: { sourceMap },
    },
    {
      loader: 'sass-loader',
      options: { sourceMap: true },
    },
    {
      loader: 'sass-resources-loader',
      options: {
        resources: resolve('src/styles/_variables.scss'),
      },
    },
  ],
  fallback: 'vue-style-loader',
})

const webpackConfig: webpack.Configuration = {
  resolve: {
    alias: {
      lodash$: 'lodash-es',
    },
    modules: [resolve('src'), resolve('server/router'), 'node_modules'],
    extensions: ['.ts', '.vue', '.js'],
  },
  output: {
    path: resolve('dist/static'),
    publicPath,
    filename: `[name].[${__DEV__ ? 'hash' : 'chunkhash'}].js`,
  },
  devtool: __DEV__ ? 'cheap-module-eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          compilerOptions: {
            module: 'esnext',
            target: 'es5',
          },
          transpileOnly: true,
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: {
            camelCase: true,
            localIdentName: __DEV__
              ? '[name]__[local]___[hash:base64:5]'
              : '[hash:base64]',
          },
          loaders: {
            scss: SCSS_LOADERS,
          },
        },
      },
      {
        test: /\.scss$/,
        use: SCSS_LOADERS,
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 8,
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize,
            },
          },
          'apply-loader',
          'pug-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...Object.entries(process.env).reduce(
        (result, [key, value]) => {
          if (key !== 'VUE_ENV') {
            result[`process.env.${key}`] = JSON.stringify(value)
          }
          return result
        },
        {} as { [key: string]: string },
      ),
      __DEV__,
      API_PREFIX: JSON.stringify('/api'),
      NON_INDEX_REGEX: /^(?!.*[/\\](index)\.ts).*\.(ts|vue)$/.toString(),
      I18N_REGEX: /([\w-]*[\w]+)\.i18n\.json$/.toString(),
    }),
    new webpack.SourceMapDevToolPlugin({ test: /\.(css|js|ts)$/ }),
    new ExtractTextPlugin({
      filename: 'app.[chunkhash].css',
      disable: __DEV__,
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve('src/tsconfig.json'),
      tslint: true,
      vue: true,
    }),
    ...(__DEV__
      ? [
          new webpack.NamedChunksPlugin(),
          new webpack.NamedModulesPlugin(),
          new FriendlyErrorsPlugin(),
        ]
      : [new webpack.optimize.ModuleConcatenationPlugin()]),
  ],
}

export default webpackConfig
