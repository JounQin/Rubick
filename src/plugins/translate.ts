import Vue from 'vue'

import { LOCALE, StrObj, Translate } from 'types'

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

const translate: Translate = (key: string, params?: StrObj) => {
  const value = translations[translate.locale][key]
  return (
    (value &&
      value.replace(/{([^{}]+)}/g, (matched, $0) => params[$0.trim()])) ||
    key
  )
}

translate.toggleLocale = () => {
  translate.locale = TOGGLE_LOCALE[translate.locale]
}

Vue.util.defineReactive(translate, 'locale', ZH)

Vue.translate = Vue.prototype.$t = translate
