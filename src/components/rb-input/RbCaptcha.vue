<template lang="pug">
img(v-if="type === 'image'", :src="src", @click.stop="getCaptcha")
rb-btn(v-else-if="type === 'code'"
       :disabled="disabled || !!seconds"
       :loading="loading"
       @click.native="sendSms") {{ seconds ? seconds + 's' : $t('send_verification_code') }}
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

const SRC = API_PREFIX + '/captcha'

@Component
export default class extends Vue {
  @Prop({ type: [String, Boolean] })
  type: string | boolean
  @Prop() disabled: boolean
  @Prop() addon: any

  src: string = SRC
  loading: boolean = null
  seconds = 0

  async getCaptcha() {
    this.src = SRC + '?' + Date.now()
  }

  async sendSms() {
    this.loading = true

    try {
      await this.$http.post('/sms', this.addon)
    } catch {
      return
    } finally {
      this.loading = false
    }

    this.seconds = 60

    const intervalId = setInterval(() => {
      if (!--this.seconds) {
        clearInterval(intervalId)
      }
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
img {
  cursor: pointer;
}
</style>

