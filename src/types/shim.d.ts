import VUE from 'vue'

import { Translate } from '../plugins/translate'

declare module 'vue/types/vue' {
  interface Vue {
    $t: Translate
  }

  interface VueConstructor {
    util: {
      defineReactive: (obj: object, key: string, val: any) => void
    }
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends VUE> {
    asyncData?: (arg: object | void) => any
  }
}
