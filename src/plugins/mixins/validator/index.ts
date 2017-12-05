import { isArray, isFunction, isObjectLike } from 'lodash'
import Vue from 'vue'

import * as validators from './validators'

const { defineReactive, warn } = Vue.util

const applyRule = function(model: string, rule: object) {
  const modelVal = this[model]
  const validation: any = {}
  for (let [ruleKey, ruleVal] of Object.entries(rule)) {
    if (isFunction(ruleVal)) {
      validation[ruleKey] = ruleVal.call(this, modelVal)
      continue
    }

    const validator = (validators as any)[ruleKey]

    if (!isFunction(validator)) {
      warn(`there is no validator named ${ruleKey}, it will be ignored!`)
      continue
    }

    ruleVal = isArray(ruleVal) ? ruleVal : [ruleVal]
    validation[ruleKey] = validator(...ruleVal).call(this, modelVal, model)
  }

  const vModel = this.$v[model]

  Object.assign(vModel, validation)

  vModel.$invalid = Object.values(validation).some(v => !v)
  vModel.$error = vModel.$dirty && vModel.$invalid
}

export default {
  beforeCreate() {
    let validator = this.$options.validator

    if (!validator) {
      return
    }

    if (isFunction(validator)) {
      validator = validator.call(this)
    }

    if (!validator.rules) {
      validator = { rules: validator }
    }

    const rules = validator.rules
    const auto = !!validator.auto

    if (!isObjectLike(rules)) {
      return warn('rules of validator should be an object')
    }

    defineReactive(this, '$v', {})

    const models = Object.keys(rules)

    this.$v.$touch = (...excepted: string[]) =>
      models.forEach(
        model => excepted.includes(model) || this.$v[model].$touch(),
      )
    this.$v.$reset = (...excepted: string[]) =>
      models.forEach(
        model => excepted.includes(model) || this.$v[model].$reset(),
      )

    Object.defineProperty(this.$v, '$invalid', {
      configurable: __DEV__,
      get: () => models.some(model => this.$v[model].$invalid),
    })

    Object.defineProperty(this.$v, '$error', {
      configurable: __DEV__,
      get: () => models.some(model => this.$v[model].$error),
    })

    for (const [model, rule] of Object.entries(rules)) {
      defineReactive(this.$v, model, {
        $dirty: auto,
        $error: false,
        $invalid: false,
      })

      const vModel = this.$v[model]

      Object.assign(vModel, {
        $touch: () => {
          if (vModel.$dirty) {
            return
          }

          vModel.$dirty = true
          applyRule.call(this, model, rule)
        },
        $reset: () => {
          if (!vModel.$dirty) {
            return
          }

          vModel.$dirty = false
          applyRule.call(this, model, rule)
        },
      })

      applyRule.call(this, model, rule)

      Vue.nextTick(() => {
        this.$watch(model, () => {
          if (auto) {
            vModel.$dirty = true
          }
          applyRule.call(this, model, rule)
        })

        vModel[auto ? '$touch' : '$reset']()
      })
    }
  },
}
