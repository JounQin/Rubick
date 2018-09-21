import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import webpack from 'webpack'

import { NODE_ENV, __DEV__, hashType, publicPath, resolve } from './config'

const minimize = !__DEV__
const sourceMap = __DEV__

const scssLoaders = ({
  extract,
  modules,
}: { extract?: boolean; modules?: boolean } = {}) => [
  extract ? MiniCssExtractPlugin.loader : 'vue-style-loader',
  {
    loader: 'css-loader',
    options: {
      modules,
      camelCase: true,
      localIdentName: __DEV__
        ? '[name]__[local]___[hash:base64:5]'
        : '_[hash:base64:10]',
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
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: scssLoaders({
              modules: true,
            }),
          } as any,
          {
            test: /app\.scss/,
            resourceQuery: /^\?vue/,
            use: scssLoaders({ extract: true }),
          },
          {
            use: scssLoaders(),
          },
        ],
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
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            loader: 'pug-plain-loader',
          },
          {
            use: [
              {
                loader: 'html-loader',
                options: {
                  minimize,
                },
              },
              'pug-plain-loader',
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
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
    new VueLoaderPlugin(),
    ...(__DEV__ ? [new FriendlyErrorsPlugin()] : []),
  ],
}

export default webpackConfig
