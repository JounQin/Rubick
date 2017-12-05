import { Context } from 'koa'

import { Controller, Method, RequestMapping } from '../decorators'

import { HTTP_METHOD, jakiro } from '../commons'

@Controller
export class LandingController {
  @RequestMapping('/login', Method.POST)
  async login(ctx: Context) {
    const { request } = ctx

    const data = request.body

    const { result, status } = await jakiro({
      url: '/generate-api-token',
      method: HTTP_METHOD.POST,
      data,
      headers: {
        CLIENT: ctx.ips.length ? ctx.ips.join(', ') : ctx.ip,
      },
    })

    ctx.status = status

    if (!result.token) {
      ctx.body = result
      return
    }

    ctx.session.user = result
    const { result: profile } = await jakiro({
      url: `/auth/${data.organization || data.username}/profile`,
    })

    let callbackUrl

    if (profile.password_is_empty) {
      callbackUrl = '/user/password'
    } else if (data.next) {
      callbackUrl = data.next
    }

    ctx.body = callbackUrl || '/'
  }
}
