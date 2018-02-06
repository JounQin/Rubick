<template lang="pug">
  input(:class="$style.input", v-bind="$attrs", v-model="model")
</template>
<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator'

const INPUT = 'input'

@Component
export default class RbInput extends Vue {
  @Model(INPUT) input: string

  get model() {
    return this.input
  }

  set model(model) {
    this.$emit(INPUT, model)
  }
}
</script>
<style lang="scss" module>
.input {
  border: 1px solid $border-color;
  padding: 7px 8px;
  width: 100%;
  outline: 0;
  border-radius: 3px;

  &:focus {
    border-color: $primary-color;
  }
}
</style>
