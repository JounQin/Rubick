export enum LOCALE {
  EN = 'en',
  ZH = 'zh',
}

export interface Translate {
  (key: string, params?: object): string
  locale?: LOCALE
  toggleLocale?(): void
}
