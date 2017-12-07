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
  const instance: Translate = (key: string, params?: StrObj) => {
    const value = translations[instance.locale][key]
    return (
      (value &&
        value.replace(/{([^{}]+)}/g, (matched, $0) => params[$0.trim()])) ||
      key
    )
  }

  instance.toggleLocale = (locale: LOCALE = TOGGLE_LOCALE[instance.locale]) => {
    if (locale !== instance.locale) {
      setCookie(LOCALE_COOKIE, (instance.locale = locale), Infinity)
    }
  }

  instance.create = createTranslate

  Vue.util.defineReactive(instance, 'locale', DEFAULT_LOCALE)

  return instance
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
