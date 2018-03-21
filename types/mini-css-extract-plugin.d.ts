declare module 'mini-css-extract-plugin' {
  import { Loader, Plugin } from 'webpack'

  namespace MiniCssExtractPlugin {
    interface MiniCssExtractPluginOptions {
      filename: string
      chunkFilename?: string
    }
  }

  class MiniCssExtractPlugin extends Plugin {
    static loader: Loader

    constructor(options?: MiniCssExtractPlugin.MiniCssExtractPluginOptions)
  }

  export = MiniCssExtractPlugin
}
