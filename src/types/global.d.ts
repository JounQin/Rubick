interface NodeModule {
  hot: {
    accept: Function
  }
}

interface Window {
  __INITIAL_STATE__: Object
}

declare const __DEV__: boolean
declare const __PROD__: boolean

declare module '*' {
  import Vue from 'vue'
  export default Vue
}
