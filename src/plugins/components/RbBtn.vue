<template lang="pug">
button.btn(:class="[`btn-${btnStyle}`, size && `btn-${size}`, { [$style.loading]: loading, }]"
           :type="type"
           :disabled="disabled || loading")
  slot
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class RbBtn extends Vue {
  @Prop({ default: 'primary' })
  btnStyle: string

  @Prop()
  size: string

  @Prop()
  type: string

  @Prop()
  disabled: boolean

  @Prop()
  loading: boolean
}
</script>
<style lang="scss" module>
.loading {
  &:global(.btn.btn-primary) {
    color: $primary-disabled-color;
  }

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    content: '';
    border: 3px solid rgba(white, 0.2);
    border-left-color: #fff;
    transform: translate3d(-50%, -50%, 0);
    animation: loading 1s infinite linear;
  }
}

@keyframes loading {
  from {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }

  to {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}
</style>
