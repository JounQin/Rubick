import Vue from 'vue'

import { LOCALE, StrObj, Translate } from 'types'
import { LOCALE_COOKIE, getCookie, setCookie } from 'utils'

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

const createTranslate = (DEFAULT_LOCALE = ZH) => {
  const translateInstance: Translate = (key: string, params?: StrObj) => {
    const value = translations[translateInstance.locale][key]
    return (
      (value &&
        value.replace(/{([^{}]+)}/g, (matched, $0) => params[$0.trim()])) ||
      key
    )
  }

  translateInstance.toggleLocale = (
    locale: LOCALE = TOGGLE_LOCALE[translateInstance.locale],
  ) => {
    if (locale !== translateInstance.locale) {
      setCookie(LOCALE_COOKIE, (translateInstance.locale = locale), Infinity)
    }
  }

  translateInstance.create = createTranslate

  Vue.util.defineReactive(translateInstance, 'locale', DEFAULT_LOCALE)

  return translateInstance
}

export const translate = createTranslate(
  __SERVER__ ? undefined : (getCookie(LOCALE_COOKIE) as LOCALE),
)

Object.defineProperty(
  Vue.prototype,
  '$t',
  __SERVER__
    ? {
        configurable: __DEV__,
        get() {
          return this.$ssrContext.translate
        },
      }
    : { value: translate, writable: __DEV__ },
)
