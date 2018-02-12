import { RouteConfig } from 'vue-router'

export const routeMap = (routes: RouteConfig[], prefix: string) =>
  routes.map(route => {
    route.path = '/' + prefix + '/' + route.path
    return route
  })
