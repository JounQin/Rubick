import Vue from 'vue'

const context = require.context('../views', true, I18N_REGEX)

enum LOCALE {
  EN = 'en',
  ZH = 'zh',
}

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

export interface Translate {
  (key: string, params: object): string
  locale?: LOCALE
  toggleLocale?(): void
}

const translate: Translate = (
  key: string,
  params?: { [key: string]: string },
) => {
  const value = translations[translate.locale][key]
  return (
    value && value.replace(/{([^{}]+)}/g, (matched, $0) => params[$0.trim()])
  )
}

translate.toggleLocale = () => {
  translate.locale = TOGGLE_LOCALE[translate.locale]
}

Vue.util.defineReactive(translate, 'locale', ZH)

Vue.prototype.$t = translate
