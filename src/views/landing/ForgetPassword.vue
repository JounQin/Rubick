<template lang="pug">
main
  form(@submit.prevent="login")
    div {{ $t('forget_password') }}
    rb-input(v-for="type of ['mobileOrEmail', 'captcha']"
             :class="{invalid: $v[type].$error}"
             :label="$t(snakeCase(type))"
             :captcha="type === 'captcha'"
             :key="type"
             v-model="_self[type]"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$error", slot="error") {{ $t('required') }}
    rb-btn.btn-block(type="submit", :disabled="$v.$invalid") {{ $t('verify_now') }}
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

@Component({
  components: {
    RbInput,
  },
  validator: {
    mobileOrEmail: {
      minLength: 1,
    },
    captcha: {
      minLength: 1,
    },
  },
})
export default class Login extends Vue {
  name: 'forget-password'

  mobileOrEmail: string = null
  captcha: string = null

  snakeCase = snakeCase
}
</script>
