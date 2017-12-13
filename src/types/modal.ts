export type MODAL_BACKDROP = boolean | 'static'

export interface Modal {
  id?: string
  component: any
  options?: {
    show?: boolean
    backdrop?: MODAL_BACKDROP
    destroy?: boolean
  }
  props?: any
}
