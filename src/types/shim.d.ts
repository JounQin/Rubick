import { AxiosStatic } from 'axios'
import VUE from 'vue'

import { RootState, Translate } from 'types'

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
  }

  interface VueConstructor {
    translate: Translate
    util: {
      defineReactive: (obj: object, key: string, val: any) => void
      warn: (msg: string) => void
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends VUE> {
    asyncData?: (arg: object | void) => any
    validator?: any
  }
}
