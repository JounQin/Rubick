<template lang="pug">
main
  form(:class="$style.container", @submit.prevent="login")
    div(:class="$style.tips") {{ $t(isAccount ? 'account_login' : 'user_login') }}
    rb-input(v-for="type of ['account', 'username', 'password']"
             v-if="!isAccount || type !== 'username'"
             :class="{invalid: $v[type].$error}"
             :label="$t(type)"
             :key="type"
             v-model="_self[type]"
             @input="$v[type].$touch()")
      template(v-if="$v[type].$error") {{ $t('required') }}
    button.btn.btn-primary.btn-block(type="submit") {{ $t('login') }}
    router-link(:to="{name: 'login', params: {type: isAccount ? null : 'account'}}") {{ $t(isAccount ? 'user_login' : 'account_login') }} »
    router-link.pull-right(v-if="isAccount" to="/password") {{ $t('forget_password') }}
  .text-center(:class="$style.register")
    router-link(to="/register") {{ $t('register_tips') }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Route } from 'vue-router'

import { Next } from 'utils'

import RbInput from 'components/rb-input/RbInput.vue'

@Component({
  components: {
    RbInput,
  },
  validator: {
    account: {
      minLength: 1,
    },
    username: {
      minLength: 1,
    },
    password: {
      minLength: 1,
    },
  },
})
export default class Login extends Vue {
  name: 'login'

  account: string = null
  username: string = null
  password: string = null

  isAccount = false

  created() {
    this.isAccount = !!this.$route.params.type
  }

  beforeRouteUpdate(to: Route, from: Route, next: Next) {
    this.isAccount = !!to.params.type
    this.$v.$reset()
    next()
  }

  login() {
    const excepted: string[] = []

    if (this.isAccount) {
      excepted.push('username')
    }

    this.$v.$touch(...excepted)

    if (this.$v.$error) {
      return
    }

    this.$http.post('/login')
  }
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
