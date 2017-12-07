const { env } = process

export enum ENV {
  APP_KEYS = 'APP_KEYS',
  API_SERVER_URL = 'API_SERVER_URL',
  CCP_ACCOUNTSID = 'CCP_ACCOUNTSID',
  CCP_ACCOUNTTOKEN = 'CCP_ACCOUNTTOKEN',
  CCP_APPID = 'CCP_APPID',
  CCP_TEMPLATEID = 'CCP_TEMPLATEID',
  CCP_SERVERIP = 'CCP_SERVERIP',
  CCP_SERVERPORT = 'CCP_SERVERPORT',
  CCP_SOFTVERSION = 'CCP_SOFTVERSION',
  NON_SSR_PATTERN = 'NON_SSR_PATTERN',
  SMS_BASE_URL = 'SMS_BASE_URL',
  STATIC_PATTERN = 'STATIC_PATTERN',
}

export enum MODE {
  STR_ARR,
  KEY_VALUE,
  KEY_VALUE_ARR,
}

interface KeyValue {
  key: string
  value: string
}

type VALUE = string | string[] | KeyValue | KeyValue[]

function getEnv(key: ENV, defaultValue?: string): string
function getEnv(
  key: ENV,
  mode?: MODE.STR_ARR,
  defaultValue?: string[],
): string[]
function getEnv(
  key: ENV,
  mode?: MODE.KEY_VALUE,
  defaultValue?: KeyValue,
): KeyValue
function getEnv(
  key: ENV,
  mode?: MODE.KEY_VALUE_ARR,
  defaultValue?: KeyValue[],
): KeyValue[]
function getEnv(
  key: ENV,
  modeOrDefaultValue: string | MODE = '',
  defaultValue?: VALUE,
): VALUE {
  const value = env[key]

  switch (modeOrDefaultValue) {
    case MODE.STR_ARR:
      return value ? value.split(',') : defaultValue || []
    case MODE.KEY_VALUE:
      if (!value) {
        return defaultValue || ({} as KeyValue)
      }

      const [k1, v1] = value.split(':')
      return {
        key: k1,
        value: v1,
      }
    case MODE.KEY_VALUE_ARR:
      if (!value) {
        return defaultValue || []
      }

      return value.split(',').map(item => {
        const [k2, v2] = item.split(':')
        return {
          key: k2,
          value: v2,
        }
      })
    default:
      return value || modeOrDefaultValue
  }
}

export { getEnv }
