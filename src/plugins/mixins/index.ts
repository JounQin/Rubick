import Vue from 'vue'

import inject, { PLUGIN_TYPE } from '../inject'

import Validator from './validator'

Vue.mixin(Validator)

inject(require.context('.', false, NON_INDEX_REGEX), PLUGIN_TYPE.MIXIN)
