<template lang="pug">
div(:class="[$style.input, {[$style.active]: active}]", @click="toggleActive")
  input(v-model="model"
        :type="type"
        :readonly="selections"
        @focus="active = true"
        @blur="active = !!model; selectionsActive = false"
        ref="input")
  transition(name="scale-y")
    ul.list-unstyled(v-if="selections", v-show="selectionsActive", :class="$style.selections")
      li(v-for="selection of selections", @click.stop="toggleSelection(selection)") {{ displayField ? selection[displayField] : selection }}
  span(:class="[$style.label, {[$style.active]: active}]") {{ label }}
  div(:class="$style.right")
    span(v-if="$slots.error", :class="$style.error")
      slot(name="error")
    rb-captcha(v-if="captcha", :type="captcha", :disabled="captchaDisabled", :addon="captchaData")
    i.fa.fa-caret-down(v-if="selections")
</template>
<script lang="ts">
import { Component, Model, Prop, Vue } from 'vue-property-decorator'

import { BasicObj, Input } from 'types'

import RbCaptcha from './RbCaptcha.vue'

type Selection = BasicObj | Input

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

  @Prop() selections: Selection[]
  @Prop() displayField: string
  @Prop() valueField: string

  @Model('input') _input: string
  @Prop() input: Input

  get model() {
    const { displayField, _input, selections, valueField } = this

    if (!selections) {
      return _input
    }

    const selection = selections.find(
      selection =>
        (valueField ? (selection as BasicObj)[valueField] : selection) ===
        _input,
    )

    return selection && displayField
      ? (selection as BasicObj)[displayField]
      : selection
  }

  set model(model) {
    const { displayField, selections, valueField } = this

    if (!selections) {
      this.$emit('input', model)
      return
    }

    const selection = selections.find(
      selection =>
        (valueField ? (selection as BasicObj)[valueField] : selection) ===
        model,
    )

    this.$emit(
      'input',
      selection && valueField ? (selection as BasicObj)[valueField] : selection,
    )
  }

  active = !!this.input
  selectionsActive = false

  toggleActive() {
    ;(this.$refs.input as HTMLInputElement).focus()

    if (this.selections) {
      this.active =
        (this.selectionsActive = !this.selectionsActive) || !!this.model
    }
  }

  toggleSelection(selection: Selection) {
    this.selectionsActive = false
    this.model = this.valueField
      ? (selection as BasicObj)[this.valueField]
      : selection as string
    this.$nextTick(() => (this.active = !!this.model))
  }
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

      .selections {
        border-color: $focus-color;
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

  $selection-height: 32px;

  .selections {
    position: absolute;
    z-index: 1;
    top: 100%;
    left: 0;
    right: 0;
    margin: 0 -1px;
    max-height: $selection-height * 3;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: $reverse-color;
    border: 1px solid $border-color;
    border-top: 0;

    > li {
      height: $selection-height;
      line-height: $selection-height;
      padding: 0 10px;

      &:hover {
        cursor: pointer;
        color: rgba(black, 0.95);
        background-color: rgba(black, 0.05);
      }
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
