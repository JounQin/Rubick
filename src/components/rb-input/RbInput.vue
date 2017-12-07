<template lang="pug">
div(:class="[$style.input, { [$style.active]: active, [$style.focus]: focus }]"
    @click="toggleActive",
    @focus="active = focus = true"
    @blur="blur"
    tabIndex="1")
  input(v-if="maxNum === 1",
        v-model="model"
        :type="type"
        :readonly="selections"
        autocomplete="new-password"
        @focus="active = focus = true"
        @blur="blur")
  ul.list-unstyled(v-if="maxNum !== 1", :class="$style.selected")
    li(v-for="(value, index) of selected", @click.stop="") {{ display(value) }}
      i.fa.fa-remove(@click.stop="removeSelected(value, index)")
  transition(name="scale-y")
    ul.list-unstyled(v-if="selectOptions", v-show="selectionsActive", :class="$style.selections")
      li(v-for="selection of selectOptions", @click.stop="toggleSelection(selection)") {{ displayField ? selection[displayField] : selection }}
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

const INPUT = 'input'

@Component({
  components: {
    RbCaptcha,
  },
})
export default class RbInput extends Vue {
  @Prop() label: string
  @Prop() type: string

  @Prop({ type: [String, Boolean] })
  captcha: string | boolean
  @Prop() captchaDisabled: boolean
  @Prop() captchaData: any

  @Prop() selections: Selection[]
  @Prop() displayField: string
  @Prop() valueField: string
  @Prop({ default: 1 })
  maxNum: number

  selectOptions: Selection[] = this.selections ? [...this.selections] : null

  @Model(INPUT, {
    type: [String, Number, Array],
  })
  input: Input | Input[]

  get model() {
    const { input } = this
    return this.selections ? this.display(input as Input) : input
  }

  set model(model) {
    const { displayField, selections, valueField } = this

    if (!selections) {
      this.$emit(INPUT, model)
      return
    }

    const selection = selections.find(
      selection =>
        (valueField ? (selection as BasicObj)[valueField] : selection) ===
        model,
    )

    this.$emit(
      INPUT,
      selection && valueField ? (selection as BasicObj)[valueField] : selection,
    )
  }

  active = !!(Array.isArray(this.input) ? this.input.length : this.input)
  focus = false
  selectionsActive = false
  selected: string[] = []

  get shouldActive() {
    return !!(this.maxNum === 1 ? this.model : this.selected.length)
  }

  display(value: Input) {
    const { displayField, valueField } = this

    const selection = this.selections.find(
      selection =>
        (valueField ? (selection as BasicObj)[valueField] : selection) ===
        value,
    )

    return selection && displayField
      ? (selection as BasicObj)[displayField]
      : selection
  }

  toggleActive() {
    if (this.selections) {
      this.focus = this.selectionsActive = !this.selectionsActive
      this.active = this.focus || this.shouldActive
    }
  }

  blur() {
    this.focus = this.selectionsActive = false
    this.active = this.shouldActive
  }

  toggleSelection(selection: Selection) {
    const value = this.valueField
      ? (selection as BasicObj)[this.valueField]
      : selection as string

    const { maxNum, selected, selectOptions, valueField } = this

    let blur

    if (maxNum === 1) {
      this.model = value
      this.selectionsActive = false
    } else if (maxNum === -1 || this.selected.length < this.maxNum) {
      const index = selectOptions.findIndex(
        selection =>
          (valueField ? (selection as BasicObj)[valueField] : selection) ===
          value,
      )

      if (index !== -1) {
        selectOptions.splice(index, 1)
        selected.push(value)

        this.$emit(INPUT, [...selected])

        blur = maxNum !== -1 && this.selected.length >= this.maxNum
      }
    } else {
      blur = true
    }

    if (blur) {
      this.focus = this.selectionsActive = false
    }

    this.$nextTick(() => (this.active = true))
  }

  removeSelected(value: string, index: number) {
    this.selected.splice(index, 1)

    const { valueField } = this

    this.selectOptions.push(
      this.selections.find(
        selection =>
          (valueField ? (selection as BasicObj)[valueField] : selection) ===
          value,
      ),
    )
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
  outline: 0;

  > input {
    padding: 10px 0;
    flex: 1;
    border: 0;
    outline: 0;
    background-color: transparent;
  }

  &:not(:global(.invalid)) {
    &.focus {
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

  .selected {
    flex: 1;
    min-height: 36px;
    margin-bottom: 0;
    padding-top: 6px;

    > li {
      display: inline-flex;
      padding: 4px 10px;
      border-radius: 3px;
      background-color: $btn-tip-bg-color;
      box-shadow: inset 0 0 0 1px rgba(34, 36, 38, 0.15);
      cursor: pointer;
      align-items: center;
      margin-bottom: 6px;
      margin-right: 5px;

      > i {
        margin-left: 5px;
        padding: 2px;
        font-size: 12px;
        opacity: 0.5;

        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .right {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }

  .error {
    margin-right: 5px;
    font-size: 12px;
    color: $invalid-color;
  }
}
</style>
