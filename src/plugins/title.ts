import { snakeCase } from 'lodash'
import Vue from 'vue'
import { Route } from 'vue-router'
import { Translator } from 'vue-translator'

export const breadCrumbs = (route: Route, $t: Translator = Vue.translator) =>
  route.matched.reduce((prev, { meta, name, path }) => {
    const { title } = meta
    let text =
      title && typeof title === 'function'
        ? title.call(route, route)
        : title || name

    if (text) {
      text = snakeCase(text)
      const nav = 'nav_' + text
      const tNav = $t(nav)
      prev.push({
        link: path,
        text: nav === tNav ? $t(text) : tNav,
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
