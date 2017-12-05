<template lang="pug">
div(:class="[$style.input, {[$style.active]: active}]", @click="$refs.input.focus()")
  input(v-model="model", :type="type", @focus="active = true",  @blur="active = !!model", ref="input")
  span(:class="[$style.label, {[$style.active]: active}]") {{ label }}
  div(:class="$style.right")
    span(v-if="$slots.error", :class="$style.error")
      slot(name="error")
    rb-captcha(v-if="captcha", :type="captcha", :disabled="captchaDisabled", :addon="captchaData")
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'
import RbCaptcha from './RbCaptcha.vue'

@Component({
  components: {
    RbCaptcha,
  },
})
export default class RbInput extends Vue {
  @Prop() label: string
  @Prop() type: string
  @Prop() captcha: string
  @Prop() captchaDisabled: boolean
  @Prop() captchaData: any

  @Model() input: string

  get model() {
    return this.input
  }

  set model(model) {
    this.$emit('input', model)
  }

  active = !!this.input
}
</script>
<style lang="scss" module>
.input {
  position: relative;
  display: flex;
  margin-bottom: 20px;
  border: 1px solid $border-color;
  padding: 0 16px;

  > input {
    padding: 10px 0;
    flex: 1;
    border: 0;
    outline: 0;
    background-color: transparent;
  }

  &:not(:global(.invalid)) {
    &.active {
      border-color: $focus-color;

      .label {
        color: $focus-color;
      }
    }
  }

  &:global(.invalid) {
    border-color: $invalid-border-color;
    background-color: $invalid-bg-color;

    > input {
      + .label {
        color: $invalid-color;
      }
    }
  }

  .label {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translate3d(0, -50%, 0);
    transition: top 0.5s, transform 0.5s;
    color: $text-desc-color;

    &.active {
      top: 0;
      transform: translate3d(0, -50%, 0) scale(0.8);
      background-color: $card-bg-color;
    }
  }

  .right {
    display: flex;
    align-items: center;
  }

  .error {
    margin-right: 5px;
    font-size: 12px;
    color: $invalid-color;
  }
}
</style>
