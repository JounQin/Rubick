import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import * as webpack from 'webpack'

import config, { globals, paths } from '../config'

const { devTool, publicPath } = config

const { __DEV__, __PROD__ } = globals

const minimize = !devTool
const sourceMap = !minimize

const SCSS_LOADERS = ExtractTextPlugin.extract({
  use: [
    {
      loader: 'css-loader',
      options: { minimize, sourceMap },
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
        resources: paths.src('styles/_variables.scss'),
      },
    },
  ],
  fallback: 'vue-style-loader',
})

const webpackConfig: webpack.Configuration = {
  resolve: {
    modules: [paths.src(), 'node_modules'],
    extensions: ['.ts', '.vue', '.js'],
  },
  output: {
    path: paths.dist(),
    publicPath,
    filename: `[name].[${__PROD__ ? 'chunkhash' : 'hash'}].js`,
  },
  devtool: devTool,
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
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
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
          'pug-html-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...globals,
      SERVER_PREFIX: JSON.stringify(config.publicPath),
    }),
    new ExtractTextPlugin({
      filename: 'app.[chunkhash].css',
      disable: __DEV__,
    }),
    ...(__PROD__
      ? [new webpack.optimize.ModuleConcatenationPlugin()]
      : [new webpack.NoEmitOnErrorsPlugin(), new FriendlyErrorsPlugin()]),
  ],
}

export default webpackConfig
