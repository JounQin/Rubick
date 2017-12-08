import { AxiosInstance } from 'axios'
import { Context } from 'koa'

import { LOCALE, Translate } from './plugin'

export interface ServerContext {
  ctx: Context
  axios: AxiosInstance
  locale: LOCALE
  state: object
  title: string
  translate: Translate
}
