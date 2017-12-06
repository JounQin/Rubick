import { Context } from 'koa'
import { omit } from 'lodash'

import { Controller, RequestMapping } from '../decorators'

import { TOKEN } from '../commons'

@Controller
export class CommonController {
  @RequestMapping('/common')
  getCommon(ctx: Context) {
    ctx.body = {
      user: omit(ctx.session.user, TOKEN),
    }
  }
}
