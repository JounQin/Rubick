import * as Koa from 'koa'

declare module 'koa' {
  interface Context {
    matched?: any[]
  }
}

export = Koa
