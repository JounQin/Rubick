<template lang="pug">
div(:class="$style.input", @click="$refs.input.focus()")
  input(v-model="model", :type="type", @focus="active = true",  @blur="active = !!model", ref="input")
  span(:class="[$style.label, {[$style.active]: active}]") {{ label }}
  span(v-if="$slots.default", :class="$style.error")
    slot
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RbInput extends Vue {
  @Prop() label: string
  @Prop() type: string

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

  > input {
    padding: 10px 16px;
    width: 100%;
    border: 1px solid $border-color;
    outline: 0;
  }

  &:not(:global(.invalid)) {
    > input:focus {
      border-color: $focus-color;

      + .label {
        color: $focus-color;
      }
    }
  }

  &:global(.invalid) {
    > input {
      border-color: $invalid-border-color;
      background-color: $invalid-bg-color;

      + .label {
        color: $invalid-color;
      }
    }
  }

  > .label {
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

  > .error {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translate3d(0, -50%, 0);
    color: $invalid-color;
  }
}
</style>
