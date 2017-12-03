import Vue from 'vue'

const combine = (context: any, modules: any, key: string) => {
  const module = context(key)
  modules[key.replace(/(^\.\/)|(\.(ts|vue)$)/g, '')] = module.default || module
  return modules
}

export enum PLUGIN_TYPE {
  COMPONENT = 'component',
  DIRECTIVE = 'directive',
  FILTER = 'filter',
  MIXIN = 'mixin',
}

const HANDLER = {
  component: combine,
  directive: combine,
  filter: (context: any, modules: any, key: string) =>
    Object.assign(modules, context(key)),
  mixin: combine,
}

export default (context: any, type: PLUGIN_TYPE) => {
  const values = context
    .keys()
    .reduce(
      (modules: any, key: string) => HANDLER[type](context, modules, key),
      {},
    )
  Object.keys(values).forEach(key => {
    const value = values[key]

    switch (type) {
      case PLUGIN_TYPE.COMPONENT:
        Vue.component(key, value)
        break
      case PLUGIN_TYPE.DIRECTIVE:
        Vue.directive(key, value)
        break
      case PLUGIN_TYPE.FILTER:
        Vue.filter(key, value)
        break
      case PLUGIN_TYPE.MIXIN:
        Vue.mixin(value)
        break
    }
  })
}
