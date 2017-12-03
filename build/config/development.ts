import { Config } from './base'

export default (config: Config) =>
  ({
    devTool: 'cheap-module-eval-source-map',
    publicPath: `http://${config.serverHost}:${config.serverPort}/`,
    hashType: 'hash',
  } as Config)
