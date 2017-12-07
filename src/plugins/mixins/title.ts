import Vue from 'vue'

function getTitle(vm: Vue) {
  let { title } = vm.$options

  const { $t } = vm

  title = title && typeof title === 'function' ? title.call(vm) : title

  return title && `${$t('alauda')} | ${$t(title as string)}`
}

const serverTitleMixin = {
  created() {
    const title = this.$ssrContext && getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  },
}

function changeTitle() {
  const title = getTitle(this)
  if (title) {
    document.title = title
  }
}

const clientTitleMixin = {
  activated: changeTitle,
  mounted: changeTitle,
}

export default (__SERVER__ ? serverTitleMixin : clientTitleMixin)
