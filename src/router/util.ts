import Vue, { ComponentOptions } from 'vue'

export const RouterView = (name: string): ComponentOptions<Vue> => ({
  name: `Route${name}`,
  render: h => h('router-view'),
})
