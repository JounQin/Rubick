import { Routes, RoutesKey } from './router'

export const LoginRequired = (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  target = propertyKey ? target : target.prototype

  const routes: Routes = target[RoutesKey]

  if (!routes) {
    throw new ReferenceError('no routes found')
  }

  let handler = descriptor.value

  const index = routes.findIndex(route => {
    const routeHandler = route.handler
    return Array.isArray(routeHandler)
      ? routeHandler.includes(handler)
      : routeHandler === handler
  })

  const oldHandler = routes[index].handler

  handler = Array.isArray(oldHandler) ? oldHandler : [oldHandler]

  routes[index].handler = [
    (ctx, next) => {
      if (!ctx.skipLogin && (!ctx.user || !ctx.user.token)) {
        ctx.throw(401)
      } else {
        next()
      }
    },
    ...handler,
  ]
}
