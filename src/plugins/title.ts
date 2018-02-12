import { snakeCase } from 'lodash'
import Vue from 'vue'
import { Route } from 'vue-router'
import { Translator } from 'vue-translator'

export const breadCrumbs = (route: Route, $t: Translator = Vue.translator) => {
  const matched = route.matched
  const record = matched[matched.length - 1] || route

  const { meta: { title }, path } = record
  const paths: string =
    (typeof title === 'function' ? title.call(route, route, record) : title) ||
    path

  let routePath = ''

  return paths.split('/').reduce((crumbs, p) => {
    if (p && !p.includes(':')) {
      const sCrumb = snakeCase(p)
      const nav = 'nav_' + sCrumb
      const tNav = $t(nav, null, true)
      routePath = routePath + '/' + p
      crumbs.push({
        link: routePath,
        text: nav === tNav ? $t(sCrumb) : tNav,
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
