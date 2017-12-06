import { AxiosInstance } from 'axios'
import Vue from 'vue'

import { LOCALE, StrObj, Translate } from 'types'
import { LOCALE_COOKIE, setCookie } from 'utils'

const context = require.context('../views', true, I18N_REGEX)

const { EN, ZH } = LOCALE

const TOGGLE_LOCALE = {
  [EN]: ZH,
  [ZH]: EN,
}

const translations: {
  [locale: string]: {
    [key: string]: string
  }
} = context.keys().reduce((modules: any, key: string) => {
  const module = context(key)
  const lang = key.match(I18N_REGEX)[1]
  const matched = modules[lang] || (modules[lang] = {})
  Object.assign(matched, module)
  return modules
}, {})

export const createTranslate = (axios: AxiosInstance, DEFAULT_LOCALE = ZH) => {
  const translate: Translate = (key: string, params?: StrObj) => {
    const value = translations[translate.locale][key]
    return (
      (value &&
        value.replace(/{([^{}]+)}/g, (matched, $0) => params[$0.trim()])) ||
      key
    )
  }

  translate.toggleLocale = (
    locale: LOCALE = TOGGLE_LOCALE[translate.locale],
  ) => {
    if (locale !== translate.locale) {
      setCookie(LOCALE_COOKIE, (translate.locale = locale), Infinity)
    }
  }

  Vue.util.defineReactive(translate, 'locale', DEFAULT_LOCALE)

  if (!__SERVER__) {
    Object.defineProperty(Vue.prototype, '$t', {
      writable: __DEV__,
      value: translate,
    })
  }

  return translate
}

if (__SERVER__) {
  Object.defineProperty(Vue.prototype, '$t', {
    configurable: __DEV__,
    get() {
      return this.$ssrContext.translate
    },
  })
}
