import { snakeCase } from 'lodash'
import Vue from 'vue'
import { Route } from 'vue-router'
import { Translator } from 'vue-translator'

export const breadCrumbs = (route: Route, $t: Translator = Vue.translator) => {
  const { matched } = route
  const {
    meta: { title },
    path,
  } = matched[matched.length - 1]

  const paths: string =
    (typeof title === 'function' ? title.call(route, route) : title) || path

  let routePath = ''

  return paths.split('/').reduce((crumbs, p) => {
    if (p && !p.startsWith(':')) {
      const crumb = snakeCase(p)
      const nav = 'nav_' + crumb
      const tNav = $t(nav, null, true)
      crumbs.push({
        link: (routePath = routePath + '/' + p),
        text: nav === tNav ? $t(crumb) : tNav,
      })
    }
    return crumbs
  }, [])
}

export const routeTitle = (route: Route, $t: Translator = Vue.translator) => {
  const title = breadCrumbs(route, $t)
    .map(({ text }) => text)
    .join(' - ')
  const prefix = $t('alauda')
  return title ? `${prefix} - ${title}` : prefix
}
