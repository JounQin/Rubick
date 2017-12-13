import { AxiosStatic } from 'axios'
import VUE from 'vue'
import { Route } from 'vue-router'
import { Store } from 'vuex'

import { RootState, Translate } from 'types'

import { RbModal } from 'components'

declare global {
  interface NodeModule {
    hot: {
      accept: () => void
    }
  }

  interface NodeRequire {
    context: (
      directory: string,
      useSubdirectories: boolean,
      regExp: RegExp,
    ) => any
  }

  interface Window {
    __INITIAL_STATE__: RootState
  }

  const __DEV__: boolean
  const __PROD__: boolean
  const __SERVER__: boolean
  const NON_INDEX_REGEX: RegExp
  const I18N_REGEX: RegExp
  const INNER_SERVER: string
  const SERVER_PREFIX: string
  const API_PREFIX: string
}

declare module 'vue/types/vue' {
  interface Vue {
    $t: Translate
    $v: any
    $http: AxiosStatic
    $modal: RbModal
    $style: any
    $util: {
      [key: string]: any
    }
  }

  interface VueConstructor {
    util: {
      defineReactive: (
        obj: object,
        key: string,
        val: any,
        customSetter?: any,
      ) => void
      warn: (msg: string) => void
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends VUE> {
    asyncData?: (params: { store: Store<RootState>; route: Route }) => any
    title?: string | (() => string)
    validator?: any
  }
}
