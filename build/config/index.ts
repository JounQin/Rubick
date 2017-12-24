import baseConfig, { globals } from './base'

import development from './development'
import production from './production'

const configs = {
  development,
  production,
}

export * from './base'

export default {
  ...baseConfig,
  ...configs[globals.NODE_ENV](baseConfig),
}
