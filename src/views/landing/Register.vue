<template lang="pug">
main
  form(:class="$style.container", @submit.prevent="register")
    div(:class="$style.tips") {{ $t('enterprise_registration') }}
    rb-input(v-for="type of types"
             :class="{invalid: $v[type].$error}"
             :label="$t(snakeCase(type))"
             :key="type"
             v-model="_self[type]"
             :type="type.indexOf('password') !== -1 ? 'password' : 'text'"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$error", slot="error") {{ $t('required') }}
    button.btn.btn-primary.btn-block(type="submit") {{ $t('register') }}
  .text-center(:class="$style.login")
    router-link(to="/login") {{ $t('login_tips') }}
</template>
<script lang="ts">
import { snakeCase } from 'lodash'
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Action } from 'vuex-class'

import { Next, User } from 'types'

import RbInput from 'components/rb-input/RbInput.vue'

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
    captcha: {
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
    'captcha',
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
  captcha: string = null
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

  register() {}
}
</script>
<style lang="scss" module>
.container {
  padding: 16px 32px;
  width: 640px;
  max-width: 100vw;
  background-color: $card-bg-color;
  margin-bottom: 20px;

  button[type='submit'] {
    margin-bottom: 20px;
  }
}

.tips {
  margin-bottom: 16px;
  font-size: 24px;
  text-align: center;
}

.login > a {
  color: $link-desc-color;
  font-size: 18px;
}
</style>
