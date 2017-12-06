import { Input } from 'types'

export const length = (len: number) =>
  function(val: string, model: string) {
    maxLength(len).call(this, val, model)
    return !!val && val.length === len
  }

export const minLength = (min: number) => (val: string) =>
  !!val && val.length >= min

export const maxLength = (max: number) =>
  function(val: string, model: string) {
    if (!val) {
      return false
    }
    const valid = val.length <= max
    if (!valid && model) {
      this[model] = this[model].toString().substr(0, max)
    }
    return valid
  }

export const mobile = (flag: boolean) =>
  function(val: string, model: string) {
    maxLength(11).call(this, val, model)
    return !!flag === /^1[35789]\d{9}$/.test(val)
  }

export const required = (flag: boolean) => (val: Input | Input[]) => {
  if (!flag) {
    return true
  }

  if (!val) {
    return false
  }

  return !!(Array.isArray(val) ? val : val + '').length
}
