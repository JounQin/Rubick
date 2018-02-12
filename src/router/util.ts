import { RouteConfig } from 'vue-router'

export const routeMap = (routes: RouteConfig[], prefix: string) =>
  routes.map(route => {
    route.name = prefix + '.' + route.name
    return route
  })
