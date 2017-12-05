import { AxiosInstance } from 'axios'

const modulesContext = require.context('./modules', false, /\.ts$/)

const chunks = modulesContext.keys().reduce((modules: any, key: string) => {
  modules[key.replace(/(^\.\/)|(\.ts$)/g, '')] = modulesContext(key).default
  return modules
}, {})

const moduleNames = Object.keys(chunks)

export default (axios: AxiosInstance) =>
  moduleNames.reduce((modules: any, moduleName) => {
    modules[moduleName] = chunks[moduleName](axios)
    return modules
  }, {})
