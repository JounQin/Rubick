import baseConfig, { Config, globals } from './base'
import dev from './development'
import prod from './production'

export * from './base'

const configs: { [key: string]: Config } = {
  development: {
    ...baseConfig,
    ...dev(baseConfig),
  },
  production: {
    ...baseConfig,
    ...prod(baseConfig),
  },
}

export default configs[globals.NODE_ENV]
