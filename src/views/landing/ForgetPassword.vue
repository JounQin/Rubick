<template lang="pug">
main
  form(:class="$style.container", @submit.prevent="login")
    div(:class="$style.tips") {{ $t('forget_password') }}
    rb-input(v-for="type of ['mobileOrEmail', 'captcha']"
             :class="{invalid: $v[type].$error}"
             :label="$t(snakeCase(type))"
             :key="type"
             v-model="_self[type]"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$error", slot="error") {{ $t('required') }}
    button.btn.btn-primary.btn-block(type="submit", :disabled="$v.$invalid") {{ $t('verify_now') }}
  .text-center(:class="$style.register")
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
<style lang="scss" module>
.container {
  padding: 16px 32px;
  width: 360px;
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

.register > a {
  color: $link-desc-color;
  font-size: 18px;
}
</style>
