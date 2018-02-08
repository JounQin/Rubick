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

export type TipProps =
  | string
  | {
      tipText?: string
      cancelText?: string
      confirmText?: string
      timeout?: number
      promptText?: string
      placeholder?: number
      close?(): void | Promise<void>
      confirm?(): void | Promise<void>
    }

export type Tip = (props: TipProps) => void
