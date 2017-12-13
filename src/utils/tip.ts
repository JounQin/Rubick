import Vue from 'vue'

const TIP_ID = '__TIP__'

const tip: any = {}
;['toast', 'alert', 'confirm', 'prompt'].forEach((value, type) => {
  tip[value] = (props: any) =>
    __SERVER__
      ? Promise.reject('should not call there method on server!')
      : Vue.prototype.$modal.open({
          id: TIP_ID,
          component: new Promise(resolve => {
            require.ensure([], require =>
              resolve(require('components/rb-modal/RbTipModal.vue')),
            )
          }),
          options: {
            backdrop: 'static',
            destroy: true,
          },
          props: {
            ...!props || typeof props === 'string'
              ? {
                  tipText: props,
                  confirm() {
                    this.$modal.close(TIP_ID)
                  },
                }
              : props,
            type,
          },
        })
})

export const toast = tip.toast
export const alert = tip.alert
export const confirm = tip.confirm
export const prompt = tip.prompt
