import { Context } from 'koa'

import { Controller, RequestMapping } from '../decorators'

import { jakiro } from 'commons'
import { User } from 'types'
import { INCORRECT_AUTHENTICATION_CREDENTIALS } from 'utils'

@Controller
export class CommonController {
  @RequestMapping('/regions')
  async fetchRegions(ctx: Context) {
    const user: User = ctx.session.user

    let regions

    if (user) {
      const { result, status } = await jakiro({
        ctx,
        url: `/regions/${user.namespace}`,
      })

      const { code } = result

      if (status >= 400 && code === INCORRECT_AUTHENTICATION_CREDENTIALS) {
        ctx.body = result
        ctx.session = null
        ctx.status = status
        return
      }

      regions = result.result
    }

    ctx.body = regions
  }
}
