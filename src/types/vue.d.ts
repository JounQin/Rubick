declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module 'v-tooltip' {
  import { DirectiveOptions, VueConstructor } from 'vue'

  export const VPopover: VueConstructor
  export const VTooltip: DirectiveOptions
}
