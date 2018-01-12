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

import RbInput from 'components/rb-input/RbInput.vue'

@Component({
  components: {
    RbInput,
  },
  translator: {
    zh: {
      mobile_or_email: '手机号或邮箱',
      captcha: '验证码',
      verify_now: '立即验证',
    },
    en: {
      mobile_or_email: 'Mobile or Email',
      captcha: 'Captcha',
      verify_now: 'Verify Now',
    },
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
export default class ForgetPassword extends Vue {
  mobileOrEmail: string = null
  captcha: string = null

  snakeCase = snakeCase
}
</script>
