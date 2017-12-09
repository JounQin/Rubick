import { Context } from 'koa'
import { omit } from 'lodash'

import { Controller, RequestMapping } from '../decorators'

import { TOKEN, jakiro } from 'commons'
import { User } from 'types'
import { INCORRECT_AUTHENTICATION_CREDENTIALS } from 'utils'

@Controller
export class CommonController {
  @RequestMapping('/common')
  async commonCheck(ctx: Context) {
    const user: User = ctx.session.user

    let regions

    if (user) {
      const { result, status } = await jakiro({
        ctx,
        url: `/regions/${user.namespace}`,
      })

      const { code } = result

      if (status >= 400 && code === INCORRECT_AUTHENTICATION_CREDENTIALS) {
        ctx.session = null
        ctx.body = result
        ctx.status = status
        return
      }

      regions = result
    }

    ctx.body = {
      user: omit(user, TOKEN),
      regions,
    }
  }
}
