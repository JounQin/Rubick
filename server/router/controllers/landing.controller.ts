import * as CaptchaPng2 from 'captchapng2'
import * as crypto from 'crypto'
import { Context } from 'koa'
import { omit } from 'lodash'

import { Controller, Method, RequestMapping } from '../decorators'

import {
  CAPTCHA_SESSION,
  TOKEN,
  VERIFICATION_CODE_COOKIE,
  jakiro,
  sendSms,
  toInt,
} from '../commons'

const randomCode = () => toInt(Math.random() * 9000 + 1000) + ''

const getImage = (input: string) => new CaptchaPng2(80, 30, input).getBuffer()

@Controller
export class LandingController {
  @RequestMapping('/login', Method.POST)
  async login(ctx: Context) {
    const { request } = ctx

    const data = request.body

    const { result, status } = await jakiro({
      ctx,
      url: '/generate-api-token',
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
      ctx,
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
