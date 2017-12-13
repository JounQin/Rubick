import { Context } from 'koa'

import { Controller, RequestMapping } from '../decorators'

import { jakiro } from 'commons'
import { Profile, Region, User } from 'types'

@Controller
export class CommonController {
  @RequestMapping('/common')
  async commonCheck(ctx: Context) {
    const user: User = ctx.session.user

    let profile: Profile
    let regions: Region[]

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
    } catch ({ result, status }) {
      ctx.session = null
      ctx.body = result
      ctx.status = status
      return
    }

    ctx.body = {
      profile,
      regions,
    }
  }

  @RequestMapping('/logout')
  logout(ctx: Context) {
    ctx.session = null
    ctx.body = null
  }
}
