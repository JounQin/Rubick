<template lang="pug">
main
  form.wider(@submit.prevent="register")
    div {{ $t('enterprise_registration') }}
    rb-input(v-for="type of types"
             :class="{invalid: $v[type].$error}"
             :label="$t(snakeCase(type))"
             :captcha="captchaType(type)"
             :captchaDisabled="type === 'verificationCode' && ($v.mobile.$invalid || $v.imageCaptcha.$invalid)"
             :captchaData="type === 'verificationCode' ? { captcha: imageCaptcha, mobile } : null"
             :key="type"
             v-model="_self[type]"
             :type="type.indexOf('password') !== -1 ? 'password' : 'text'"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$error", slot="error") {{ $t('required') }}
    rb-btn.btn-block(type="submit") {{ $t('register') }}
  .tips.text-center
    router-link(to="/login") {{ $t('login_tips') }}
</template>
<script lang="ts">
import { snakeCase } from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Action } from 'vuex-class'

import { Next, User } from 'types'

import RbInput from 'components/rb-input/RbInput.vue'

const CaptchaType: {
  [key: string]: string
} = {
  imageCaptcha: 'image',
  verificationCode: 'code',
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
  trailMode: string = null
  applyingServices: string[] = null
  informedWay: string = null

  snakeCase = snakeCase

  captchaType(type: string) {
    return CaptchaType[type]
  }

  register() {}
}
</script>
