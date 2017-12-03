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
  __INITIAL_STATE__: object
}

declare const __DEV__: boolean
declare const __PROD__: boolean
declare const __SERVER__: boolean
declare const NON_INDEX_REGEX: RegExp
declare const I18N_REGEX: RegExp

declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
