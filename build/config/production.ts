import { Config } from './base'

export default (config: Config) =>
  ({
    devTool: false,
    serverHost: 'localhost',
    publicPath: '/',
    hashType: 'chunkhash',
  } as Config)
