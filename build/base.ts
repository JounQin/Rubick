import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as webpack from 'webpack'

import { NODE_ENV, __DEV__, hashType, publicPath, resolve } from './config'

const minimize = !__DEV__
const sourceMap = __DEV__

const scssLoaders = (extract?: boolean) => [
  extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
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
]

const webpackConfig: webpack.Configuration = {
  mode: NODE_ENV,
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
    filename: `[name].[${hashType}].js`,
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
            scss: scssLoaders(),
          },
        },
      },
      {
        test: /\.scss$/,
        use: scssLoaders(true),
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
          'pug-html-loader',
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
    new MiniCssExtractPlugin({
      filename: `[name].[${hashType}].css`,
      chunkFilename: `[name].[${hashType}].css`,
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: resolve('src/tsconfig.json'),
      tslint: true,
      vue: true,
    }),
    ...(__DEV__ ? [new FriendlyErrorsPlugin()] : []),
  ],
}

export default webpackConfig
