import { AxiosInstance } from 'axios'
import { Context } from 'koa'
import { Translator } from 'vue-translator'

import { Locale } from './plugin'

export interface ServerContext {
  ctx: Context
  axios: AxiosInstance
  locale: Locale
  state: object
  title: string
  translator: Translator
}
