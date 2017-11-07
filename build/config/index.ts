import config, {globals} from './base'

export * from './base'

// tslint:disable-next-line no-var-requires
export default {...config, ...require(`./${globals.NODE_ENV}`).default(config)}
