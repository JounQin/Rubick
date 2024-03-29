import path from 'path'

const DEV = 'development'
const PROD = 'production'

type NodeEnv = typeof DEV | typeof PROD

export const NODE_ENV = (process.env.NODE_ENV || PROD) as NodeEnv

export const __DEV__ = NODE_ENV === DEV

export const serverHost = '0.0.0.0'

export const serverPort = +process.env.PORT || 5000

export const publicPath = '/'

export const hashType = __DEV__ ? 'hash' : 'contenthash'

export const innerServer = `http://localhost:${serverPort}/`

export const { resolve } = path

export const runtimeRequire =
  typeof __non_webpack_require__ === 'undefined'
    ? require
    : __non_webpack_require__

export const getDllFile = () => {
  const { name } = runtimeRequire(resolve('dist/vendors.dll.manifest.json'))
  return `vendors.dll.${name.split('_')[1]}.js`
}
