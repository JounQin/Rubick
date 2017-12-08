import { snakeCase } from 'lodash'
import { Route } from 'vue-router'

import { translate } from './translate'

export const breadCrumbs = (route: Route) =>
  route.matched.reduce((prev, { meta, name, path }) => {
    const { title } = meta
    const text =
      title && typeof title === 'function'
        ? title.call(route, route)
        : title || name

    if (text) {
      prev.push({
        link: path,
        text,
      })
    }

    return prev
  }, [])

export const routeTitle = (route: Route, $t = translate) => {
  const title = breadCrumbs(route)
    .map(({ text }) => {
      text = snakeCase(text)
      const nav = $t('nav_' + text)
      text = text === nav ? $t(text) : nav
      return text
    })
    .join(' - ')
  const prefix = $t('alauda')
  return title ? `${prefix} - ${title}` : prefix
}
