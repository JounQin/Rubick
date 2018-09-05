export interface StrObj {
  [key: string]: string
}

export interface NumObj {
  [key: string]: string
}

export type BasicObj = StrObj | NumObj

export interface Dictionary<T = any> {
  [key: string]: T
}
