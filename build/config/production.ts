import { Config } from './base'

export default (config: Config) =>
  ({
    devTool: false,
    serverHost: 'localhost',
    publicPath: '/',
    hashType: 'chunkhash',
    minimize: true,
  } as Config)
