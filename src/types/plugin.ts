export enum LOCALE {
  EN = 'en',
  ZH = 'zh',
}

export interface Translate {
  (key: string, params?: object): string
  locale?: LOCALE
  toggleLocale?(locale?: LOCALE): void
  create?(DEFAULT_LOCALE?: LOCALE): Translate
}
