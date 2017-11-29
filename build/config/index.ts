import config, { globals } from './base'

export * from './base'

export default {
  ...config,
  // tslint:disable-next-line no-var-requires
  ...require(`./${globals.NODE_ENV}`).default(config),
}
