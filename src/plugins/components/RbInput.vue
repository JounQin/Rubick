<template lang="pug">
  input(:class="$style.input", v-bind="$attrs")
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class RbInput extends Vue {}
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
