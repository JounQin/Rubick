import { AxiosInstance } from 'axios'
import { Context } from 'koa'

import { Translate } from './plugin'

export interface ServerContext {
  ctx: Context
  axios: AxiosInstance
  state: object
  translate: Translate
}
