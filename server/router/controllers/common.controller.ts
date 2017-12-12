import { Context } from 'koa'

import { Controller, RequestMapping } from '../decorators'

import { jakiro } from 'commons'
import { User } from 'types'

@Controller
export class CommonController {
  @RequestMapping('/common')
  async commonCheck(ctx: Context) {
    const user: User = ctx.session.user

    let profile
    let regions

    try {
      const [
        { result: profileResult },
        { result: regionsResult },
      ] = await Promise.all([
        jakiro({
          ctx,
          url: '/auth/profile',
        }),
        jakiro({
          ctx,
          url: `/regions/${user.namespace}`,
        }),
      ])

      profile = profileResult
      regions = regionsResult
    } catch (e) {
      ctx.session = null
      ctx.body = e
      ctx.status = e.status
      return
    }

    ctx.body = {
      profile,
      regions,
    }
  }
}
