<template lang="pug">
div(:class="$style.input", @click="active = true; $refs.input.focus()")
  span(:class="[$style.label, {[$style.active]: active}]") {{ label }}
  input(v-model="model", @blur="active = !!model", ref="input")
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

const CHANGE = 'change'

@Component
export default class RbInput extends Vue {
  @Prop() label: string

  @Model(CHANGE) input: string

  get model() {
    return this.input
  }

  set model(model) {
    this.$emit(CHANGE, model)
  }

  active = !!this.input
}
</script>
<style lang="scss" module>
.input {
  position: relative;
  display: flex;
  margin-bottom: 20px;

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

  > input {
    padding: 10px 16px;
    width: 100%;
    border: 1px solid $border-color;
    outline: 0;
  }
}
</style>
