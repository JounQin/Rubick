import Koa from 'koa'

declare module 'koa' {
  interface Context {
    matched?: any[]
    skipLogin?: boolean
  }
}

export = Koa
