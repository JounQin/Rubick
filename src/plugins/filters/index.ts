import inject, { PLUGIN_TYPE } from '../inject'

inject(require.context('.', false, NON_INDEX_REGEX), PLUGIN_TYPE.FILTER)
