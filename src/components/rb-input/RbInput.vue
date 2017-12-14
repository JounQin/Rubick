<template lang="pug">
.rc-input(:class="[$style.rcInput, { [$style.active]: active, [$style.focus]: focus }]"
    @click="toggleActive",
    @focus="onFocus"
    @blur="blur"
    tabIndex="1")
  .content(:class="$style.content")
    .left(:class="$style.left", v-if="$slots.left")
      slot(name="left")
    input(v-if="!emptyText && (!selections || (maxNum === 1 && !model))"
          v-model="model"
          :class="$style.input"
          :type="type"
          :readonly="selections"
          ref="input"
          @focus="active = focus = true"
          @blur="blur")
    template(v-else)
      .input(v-if="emptyText || maxNum === 1", :class="$style.input") {{ model || emptyText }}
      ul.list-unstyled(v-else, :class="$style.selected")
        li(v-for="(value, index) of selected", @click.stop="") {{ display(value) }}
          i.fa.fa-remove(@click.stop="removeSelected(value, index)")
    span(:class="[$style.label, {[$style.active]: active}]") {{ label }}
    .right(:class="$style.right")
      span(v-if="$slots.error", :class="$style.error")
        slot(name="error")
      rb-captcha(v-if="captcha", :type="captcha", :disabled="captchaDisabled", :addon="captchaData")
      i.fa.fa-caret-down(v-if="selections")
  transition(name="scale-y")
    ul.list-unstyled(v-if="selectOptions.length", v-show="selectionsActive", :class="$style.selections")
      li(v-for="selection of selectOptions"
         :class="{ [$style.selectedItem]: (valueField ? selection[valueField] : selection) === value }"
         @click.stop="toggleSelection(selection)") {{ displayField ? selection[displayField] : selection }}
</template>
<script lang="ts">
import {} from 'lodash'
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'

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
  @Prop() emptyText: string
  @Prop({ default: 1 })
  maxNum: number

  selectOptions: Selection[] = this.selections ? [...this.selections] : []

  @Watch('selections')
  selectionsChange(prev: Selection[], curr: Selection[]) {
    this.selectOptions = this.selections ? [...this.selections] : []
    this.selected = []
  }

  @Model(INPUT, {
    type: [String, Number, Array],
  })
  value: Input | Input[]

  get model() {
    const { value } = this
    return this.selections ? this.display(value as Input) : value
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

  active = !!(Array.isArray(this.value) ? this.value.length : this.value)
  focus = false
  selectionsActive = false
  selected: string[] = []

  get shouldActive() {
    return !!(this.maxNum === 1 ? this.model : this.selected.length)
  }

  onFocus() {
    const { input } = this.$refs
    if (input) {
      ;(input as HTMLInputElement).focus()
    } else {
      this.active = this.focus = true
    }
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
.rc-input {
  position: relative;
  margin-bottom: 20px;
  border: 1px solid $border-color;
  background-color: $reverse-color;
  outline: 0;

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

    .input + .label {
      color: $invalid-color;
    }
  }
}

.content {
  display: flex;
}

.input {
  padding: 10px 16px;
  flex: 1;
  border: 0;
  outline: 0;
  line-height: 16px;
  background-color: transparent;
}

.label {
  display: inline-block;
  line-height: 1;
  position: absolute;
  top: 50%;
  left: 16px;
  padding: 0 2px;
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
  max-height: $selection-height * 3 + 1px;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $reverse-color;
  border: 1px solid $border-color;
  border-top: 0;

  > li {
    height: $selection-height;
    line-height: $selection-height;
    padding: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(black, 0.87);

    &.selected-item {
      font-weight: 700;
      color: rgba(65, 76, 94, 0.7);
      background-color: rgba(black, 0.05);
    }

    &:not(.selected-item):hover {
      cursor: pointer;
      color: #53bce5;
      background-color: #d6eef8;
    }
  }
}

.selected {
  flex: 1;
  min-height: 36px;
  margin-left: 16px;
  margin-bottom: 0;
  padding-top: 8px;

  > li {
    display: inline-flex;
    padding: 3px 10px;
    border-radius: 3px;
    background-color: $btn-tip-bg-color;
    box-shadow: inset 0 0 0 1px rgba(34, 36, 38, 0.15);
    cursor: pointer;
    align-items: center;
    margin-bottom: 3px;
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

.left {
  display: flex;
  align-items: center;
  padding-right: 10px;
}

.right {
  display: flex;
  align-items: center;

  > i {
    margin-right: 10px;
  }
}

.error {
  margin-right: 5px;
  font-size: 12px;
  color: $invalid-color;
}
</style>
