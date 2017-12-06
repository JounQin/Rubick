<template lang="pug">
main
  form.wider(@submit.prevent="register")
    div {{ $t('enterprise_registration') }}
    rb-input(v-for="type of types"
             :class="{invalid: $v[type].$error}"
             :label="$t(snakeCase(type))"
             :captcha="Captchas[type]"
             :captchaDisabled="type === 'verificationCode' && ($v.mobile.$invalid || $v.imageCaptcha.$invalid)"
             :captchaData="type === 'verificationCode' ? { captcha: imageCaptcha, mobile } : null"
             :selections="Selections[type]"
             displayField="display",
             valueField="value"
             :maxNum="type === 'applyingServices' ? -1 : 1"
             :key="type"
             v-model="_self[type]"
             :type="type.indexOf('password') !== -1 ? 'password' : 'text'"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$error", slot="error") {{ $t('required') }}
    rb-btn.btn-block(type="submit", :disabled="$v.$invalid") {{ $t('register') }}
  .tips.text-center
    router-link(to="/login") {{ $t('login_tips') }}
</template>
<script lang="ts">
import { snakeCase } from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Action } from 'vuex-class'

import { Next, User } from 'types'

import RbInput from 'components/rb-input/RbInput.vue'

const Captchas: {
  [key: string]: string
} = {
  imageCaptcha: 'image',
  verificationCode: 'code',
}

const SelectionsType = {
  industry: [
    'education',
    'e-commerce',
    'mobile-medical',
    'entertainment',
    'locale',
    'social-network',
    'estate-service',
    'ads-marketing',
    'mobile-internet',
    'travel',
    'game',
    'tool-software',
    'internet-finance',
    'enterprise-service',
    'others',
  ],
  trailMode: ['professional', 'enterprise', 'data-center'],
  applyingServices: [
    'cloud-strategy-consultancy',
    'cloud-solution-architect',
    'application-migrating-deployment',
    'support-operational-optimization',
    'professional-training',
  ],
  informedWay: [
    'social-site',
    'offline-activity',
    'media-reports',
    'forums',
    'search-engine',
    'recommended',
    'others',
  ],
}

@Component({
  components: {
    RbInput,
  },
  validator: {
    account: {
      minLength: 1,
    },
    email: {
      minLength: 1,
    },
    password: {
      minLength: 1,
    },
    confirmPassword: {
      minLength: 1,
    },
    mobile: {
      mobile: true,
    },
    imageCaptcha: {
      length: 4,
    },
    verificationCode: {
      length: 4,
    },
    realyname: {
      minLength: 1,
    },
    company: {
      minLength: 1,
    },
    city: {
      minLength: 1,
    },
    industry: {
      minLength: 1,
    },
    position: {
      minLength: 1,
    },
    trailMode: {
      minLength: 1,
    },
    applyingServices: {
      minLength: 1,
    },
    informedWay: {
      minLength: 1,
    },
  },
})
export default class Login extends Vue {
  name: 'register'

  types = [
    'account',
    'email',
    'password',
    'confirmPassword',
    'mobile',
    'imageCaptcha',
    'verificationCode',
    'realyname',
    'company',
    'city',
    'industry',
    'position',
    'trailMode',
    'applyingServices',
    'informedWay',
  ]

  account: string = null
  email: string = null
  password: string = null
  confirmPassword: string = null
  mobile: string = null
  imageCaptcha: string = null
  verificationCode: string = null
  realyname: string = null
  company: string = null
  city: string = null
  industry: string = null
  position: string = null
  trailMode: string[] = null
  applyingServices: string[] = null
  informedWay: string = null

  snakeCase = snakeCase

  Captchas = Captchas

  Selections: { [key: string]: { display: string; value: string }[] } = {}

  @Watch('$t.locale', { immediate: true })
  translate() {
    for (let [key, values] of Object.entries(SelectionsType)) {
      this.Selections[key] = values.map(value => ({
        display: Vue.translate(snakeCase(value)),
        value,
      }))
    }
  }

  register() {}
}
</script>
