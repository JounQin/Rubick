import { intersection } from 'lodash'
import Vue from 'vue'

import { LOCALE, StrObj, Translate } from 'types'
import { LOCALE_COOKIE, Lang, Locale, getCookie, setCookie } from 'utils'

const context = require.context('../views', true, I18N_REGEX)

const { EN, ZH } = LOCALE

const TOGGLE_LOCALE = {
  [EN]: ZH,
  [ZH]: EN,
}

const LOCALE_KEYS: { [key: string]: string[] } = {
  [EN]: [],
  [ZH]: [],
}

const translations: {
  [locale: string]: {
    [key: string]: string
  }
} = context.keys().reduce((modules: any, key: string) => {
  const module = context(key)
  const lang = key.match(I18N_REGEX)[1]
  const matched = modules[lang] || (modules[lang] = {})

  if (__DEV__) {
    const keys = LOCALE_KEYS[lang]
    const moduleKeys = Object.keys(module)

    const duplicates = intersection(keys, moduleKeys)

    if (duplicates.length) {
      // tslint:disable-next-line no-console
      console.warn('detect duplicate keys:', duplicates)
    }

    keys.push(...moduleKeys)
  }

  Object.assign(matched, module)
  return modules
}, {})

const setDocLang = (locale: LOCALE) => {
  document.documentElement.setAttribute(Lang, locale)
}

const createTranslate = (instanceLocale = ZH) => {
  const watchers: Array<(prev?: LOCALE, curr?: LOCALE) => void> = []

  const instance: Translate = (key: string, params?: StrObj) => {
    let value = translations[instance.locale][key]
    value =
      value && value.replace(/{([^{}]+)}/g, (matched, $0) => params[$0.trim()])
    return value == null ? key : value
  }

  instance.toggleLocale = (locale: LOCALE = TOGGLE_LOCALE[instance.locale]) => {
    if (locale !== instance.locale) {
      setCookie(LOCALE_COOKIE, (instance.locale = locale), Infinity, '/')
      setDocLang(locale)
    }
  }

  const unwatch = () => {
    watchers.length = 0
  }

  instance.$watch = watcher => {
    if (!watchers.includes(watcher)) {
      watchers.push(watcher)
    }
    return unwatch
  }

  instance.create = createTranslate

  Object.defineProperty(instance, Locale, {
    configurable: true,
    get() {
      return instanceLocale
    },
    set(locale) {
      if (locale === instanceLocale) {
        return
      }
      const prev = instanceLocale
      instanceLocale = locale
      watchers.forEach(watcher => watcher(prev, locale))
    },
  })

  Vue.util.defineReactive(instance, Locale, instanceLocale)

  return instance
}

let defaultLocale

if (!__SERVER__) {
  defaultLocale = (getCookie(LOCALE_COOKIE) as LOCALE) || undefined

  if (defaultLocale && !window.__INITIAL_STATE__) {
    setDocLang(defaultLocale)
  }
}

export const translate = createTranslate(defaultLocale)

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
