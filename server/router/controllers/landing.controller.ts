import { Context } from 'koa'
import { omit } from 'lodash'

import { Controller, Method, RequestMapping } from '../decorators'

import { HTTP_METHOD, jakiro } from '../commons'

const TOKEN = 'token'

@Controller
export class LandingController {
  @RequestMapping('/login')
  checkLogin(ctx: Context) {
    ctx.body = omit(ctx.session.user, TOKEN)
  }

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

    ctx.body = {
      url: callbackUrl || '/',
      user: omit(result, TOKEN),
    }
  }
}
