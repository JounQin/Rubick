const { env } = process

export enum ENV {
  APP_KEYS = 'APP_KEYS',
  API_SERVER_URL = 'API_SERVER_URL',
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

function getEnv(key: string, defaultValue?: string): string
function getEnv(
  key: string,
  mode?: MODE.STR_ARR,
  defaultValue?: string[],
): string[]
function getEnv(
  key: string,
  mode?: MODE.KEY_VALUE,
  defaultValue?: KeyValue,
): KeyValue
function getEnv(
  key: string,
  mode?: MODE.KEY_VALUE_ARR,
  defaultValue?: KeyValue[],
): KeyValue[]
function getEnv(
  key: string,
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
