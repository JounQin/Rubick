import * as CaptchaPng2 from 'captchapng2'
import * as crypto from 'crypto'
import { Context } from 'koa'
import { omit } from 'lodash'

import { Controller, Method, RequestMapping } from '../decorators'

import {
  CAPTCHA_SESSION,
  HTTP_METHOD,
  TOKEN,
  VERIFICATION_CODE_COOKIE,
  jakiro,
  sendSms,
} from 'commons'
import { toInt } from 'utils'

const randomCode = () => toInt(Math.random() * 9000 + 1000) + ''

const getImage = (input: string) => new CaptchaPng2(80, 30, input).getBuffer()

@Controller
export class LandingController {
  @RequestMapping('/login')
  async loginCheck(ctx: Context) {
    ctx.body = omit(ctx.session.user, TOKEN)
  }

  @RequestMapping('/login', Method.POST)
  async login(ctx: Context) {
    const { request } = ctx

    const data = request.body

    let user

    try {
      const { result } = await jakiro({
        ctx,
        url: '/generate-api-token',
        headers: {
          CLIENT: ctx.ips.length ? ctx.ips.join(', ') : ctx.ip,
        },
      })

      user = result
    } catch ({ result, status }) {
      ctx.body = result
      ctx.status = status
      return
    }

    ctx.user = ctx.session.user = user

    const { result: profile } = await jakiro({
      ctx,
      url: `/auth/${data.organization || data.username}/profile`,
      method: HTTP_METHOD.GET,
    })

    let callbackUrl

    if (profile.password_is_empty) {
      callbackUrl = '/user/password'
    } else if (data.next) {
      callbackUrl = data.next
    }

    ctx.body = {
      url: callbackUrl || '/',
      user: omit(user, TOKEN),
    }
  }

  @RequestMapping('/captcha')
  getCaptcha(ctx: Context) {
    const captcha = randomCode()
    ctx.session[CAPTCHA_SESSION] = captcha
    ctx.type = 'image/png'
    ctx.body = getImage(captcha)
  }

  @RequestMapping('/sms', Method.POST)
  async sendSms(ctx: Context) {
    const captcha = ctx.session[CAPTCHA_SESSION]

    if (captcha !== ctx.request.body.captcha) {
      ctx.body = {
        errors: [
          {
            code: 'invalid_captcha',
          },
        ],
      }
      ctx.status = 401
      return
    }

    const code = randomCode()

    const { mobile } = ctx.request.body

    await sendSms(mobile, code)

    ctx.cookies.set(
      VERIFICATION_CODE_COOKIE,
      crypto
        .createHash('md5')
        .update(mobile + code)
        .digest('hex'),
      {
        maxAge: 60 * 60 * 1000,
      },
    )
  }
}
