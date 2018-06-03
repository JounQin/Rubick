import path from 'path'

const DEV = 'development'
const PROD = 'production'

type NodeEnv = typeof DEV | typeof PROD

export const NODE_ENV = (process.env.NODE_ENV || PROD) as NodeEnv

export const __DEV__ = NODE_ENV === DEV

export const serverHost = 'localhost'

export const serverPort = +process.env.PORT || 4000

export const publicPath = __DEV__ ? `http://${serverHost}:${serverPort}/` : '/'

export const hashType = __DEV__ ? 'hash' : 'contenthash'

export const innerServer = `http://localhost:${serverPort}/`

export const resolve = (...args: string[]) =>
  path.resolve(process.cwd(), ...args)

export const runtimeRequire =
  typeof __non_webpack_require__ === 'undefined'
    ? require
    : __non_webpack_require__

export const getDllFile = () => {
  const { name } = runtimeRequire(resolve('dist/vendors.dll.manifest.json'))
  return `vendors.dll.${name.split('_')[1]}.js`
}
