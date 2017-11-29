import baseConfig, { Config, globals } from './base'

export * from './base'

const config: Config = {
  ...baseConfig,
  // tslint:disable-next-line no-var-requires
  ...require(`./${globals.NODE_ENV}`).default(baseConfig),
}

export default config
