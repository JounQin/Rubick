import { intersection, merge } from 'lodash'
import Vue from 'vue'
import VueTranslator from 'vue-translator'

import { Locale } from 'types'
import { getCookie, LOCALE_COOKIE } from 'utils'

const context = require.context('../views', true, I18N_REGEX)

const { EN, ZH } = Locale

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

Vue.use(VueTranslator, {
  defaultLocale: Locale.EN,
  locale: (!__SERVER__ && (getCookie(LOCALE_COOKIE) as Locale)) || undefined,
  merge,
  translations,
})

const { translator } = Vue

translator.toggleLocale = () => {
  translator.locale = TOGGLE_LOCALE[translator.locale as Locale]
}
