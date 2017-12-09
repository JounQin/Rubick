import { Context } from 'koa'
import { omit } from 'lodash'

import { Controller, RequestMapping } from '../decorators'

import { TOKEN, jakiro } from 'commons'
import { User } from 'types'

@Controller
export class CommonController {
  @RequestMapping('/common')
  async commonCheck(ctx: Context) {
    const user: User = ctx.session.user

    let regions

    if (user) {
      const { result } = await jakiro({
        ctx,
        url: `/regions/${user.namespace}`,
      })

      regions = result
    }

    ctx.body = {
      user: omit(user, TOKEN),
      regions,
    }
  }
}
