import { Context } from 'koa'

import { Controller, Method, RequestMapping } from '../decorators'

@Controller
export class LandingController {
  @RequestMapping('/login', Method.POST)
  login(ctx: Context) {
    ctx.body = {
      url: '/',
    }
  }
}
