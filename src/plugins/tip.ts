import Vue from 'vue'

import { TipProps } from 'types'

const TIP_ID = '__TIP__'

const getRbTipModal = () => import('components/rb-modal/RbTipModal.vue')

void ['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  Object.defineProperty(Vue.prototype, `$${value}`, {
    value(props: TipProps) {
      __SERVER__
        ? Promise.reject('should not call there method on server!')
        : this.$modal.open({
            id: TIP_ID,
            component: getRbTipModal(),
            options: {
              backdrop: 'static',
              destroy: true,
            },
            props: {
              ...(!props || typeof props === 'string'
                ? {
                    tipText: props,
                    confirm() {
                      this.$modal.close(TIP_ID)
                    },
                  }
                : props),
              type,
            },
          })
    },
    writable: __DEV__,
  })
})
