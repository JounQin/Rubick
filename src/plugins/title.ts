import { snakeCase } from 'lodash'
import Vue from 'vue'
import { Route } from 'vue-router'
import { Translator } from 'vue-translator'

export const breadCrumbs = (route: Route, $t: Translator = Vue.translator) =>
  route.matched.reduce((prev, { meta, name, path }) => {
    const { title } = meta
    const crumbs: string =
      (typeof title === 'function' ? title.call(route, route) : title) || name

    if (crumbs) {
      let routeName: string
      crumbs.split('.').forEach((crumb, index) => {
        routeName = routeName ? routeName + '.' + crumb : crumb
        const sCrumb = snakeCase(crumb)
        const nav = 'nav_' + sCrumb
        const tNav = $t(nav, null, true)
        prev.push({
          name: routeName,
          text: nav === tNav ? $t(sCrumb) : tNav,
        })
      })
    }

    return prev
  }, [])

export const routeTitle = (route: Route, $t: Translator = Vue.translator) => {
  const title = breadCrumbs(route, $t)
    .map(({ text }) => text)
    .join(' - ')
  const prefix = $t('alauda')
  return title ? `${prefix} - ${title}` : prefix
}
