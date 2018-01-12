<template lang="pug">
div(v-if="modals.length")
  .modal-backdrop(v-if="currModal && currModal.options.backdrop")
  component(v-for="{id, component, props, options} of modals",
  :is="component",
  :key="id",
  ref="modal",
  v-bind="props",
  v-show="options.show",
  @click.self.native="handleBackdrop(id, options.backdrop)")
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import { MODAL_BACKDROP, Modal } from 'types'

const isPromise = (promise: any) =>
  Object.prototype.toString.call(promise) === '[object Promise]' ||
  promise instanceof Promise

const DEFAULT_OPTIONS = {
  show: true,
  backdrop: true,
  destroy: false,
}

const NON_TRANSITION_ERR =
  'this modal item is not a Vue component, you should use `transition` component and emit `after-leave` event'

if (__SERVER__) {
  Object.defineProperty(Vue.prototype, '$modal', {
    configurable: __DEV__,
    get() {
      return this.$ssrContext.$modal
    },
  })
}

@Component
export default class RbModal extends Vue {
  modals: Modal[] = []
  currModal: Modal = null

  get currModalId() {
    return this.currModal && this.currModal.id
  }

  @Watch('currModal')
  currModalChange(modal: Modal) {
    document.body.classList[modal ? 'add' : 'remove']('modal-open')
  }

  beforeCreate() {
    if (__SERVER__) {
      this.$ssrContext.$modal = this
      return
    }

    Object.defineProperty(Vue.prototype, '$modal', {
      value: this,
      writable: __DEV__,
    })
  }

  close(modalId?: string, destroy?: boolean): Promise<void> {
    modalId = modalId || this.currModalId

    let modal

    if (modalId) {
      modal = this.getModal(modalId)
    }

    if (!modalId || !modal) {
      return Promise.resolve()
    }

    const { options } = modal

    options.show = false

    const modalItem = this.getModalItem(modalId)

    if (!modalItem) {
      return Promise.reject(new TypeError(NON_TRANSITION_ERR))
    }

    const callback = (resolve: () => void) => {
      options.destroy || destroy
        ? this.removeModal(modalId)
        : this.resetCurrModal(modalId)
      resolve()
    }

    return new Promise(
      resolve =>
        getComputedStyle(modalItem.$el).display === 'none'
          ? callback(resolve)
          : modalItem.$once('after-leave', () => callback(resolve)),
    )
  }

  closeAll(destroy = true, immediate?: boolean) {
    let promise = Promise.resolve()

    if (destroy && immediate) {
      this.modals = []
    } else {
      this.modals.forEach(modal => {
        promise = promise.then(() => {
          this.close(modal.id, destroy)
        })
      })
    }

    return promise
  }

  open(modal: Modal) {
    modal.id = modal.id || Date.now().toString()
    return isPromise(modal.component)
      ? modal.component.then((component: any) =>
          this.resolve(
            Object.assign(modal, {
              component: component.default || component,
            }),
          ),
        )
      : this.resolve(modal)
  }

  getModal(modalId: string) {
    return this.modals.find(m => m.id === modalId)
  }

  getModalIndex(modalId: string) {
    return this.modals.findIndex(m => m.id === modalId)
  }

  getModalRef(modalId: string) {
    return (this.$refs.modal as Vue[])[this.getModalIndex(modalId)]
  }

  handleBackdrop(id: string, backdrop: MODAL_BACKDROP) {
    if (backdrop === 'static') {
      return
    }
    this.close(id)
  }

  private resolve(modal: Modal) {
    const { id, component, props, options } = modal

    const m = this.getModal(id)

    if (m) {
      if (component) {
        m.component = component
      }
      modal = m
    } else if (!component) {
      return Promise.reject(
        new ReferenceError('no component passed on initialization'),
      )
    }

    modal.props = { ...props }

    const opts = { ...DEFAULT_OPTIONS, ...options }

    if (!opts.show) {
      modal.options = opts
      return Promise.resolve()
    }

    const promise = this.currModalId === id ? Promise.resolve() : this.close()

    return promise.then(() => {
      modal.options = opts
      if (!m) {
        this.modals.push(modal)
      }
      this.currModal = modal

      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const modalItem = this.getModalItem(id)
          modalItem
            ? modalItem.$once('after-enter', () => resolve(modal))
            : reject(new TypeError(NON_TRANSITION_ERR))
        })
      })
    })
  }

  private getModalItem(modalId: string) {
    const modalRef = this.getModalRef(modalId)
    return modalRef && modalRef.$children[0]
  }

  private resetCurrModal(modalId: string) {
    if (modalId === this.currModalId) {
      this.currModal = null
    }
  }

  private removeModal(modalId: string) {
    const modalIndex = this.getModalIndex(modalId)
    if (modalIndex + 1) {
      this.modals.splice(modalIndex, 1)
    }
    this.resetCurrModal(modalId)
  }
}
</script>
<style lang="scss">
$zindex-modal-background: 1040 !default;
$modal-backdrop-bg: #000 !default;
$modal-backdrop-opacity: 0.5 !default;

// Kill the scroll on the body
.modal-open {
  overflow: hidden;
}

// Modal background
.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: $zindex-modal-background;
  background-color: $modal-backdrop-bg;
  @include opacity(0.5);
}
</style>
