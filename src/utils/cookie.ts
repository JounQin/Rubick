import { INFINITY_DATE } from './constants'

export const getCookie = (name: string) =>
  decodeURIComponent(
    document.cookie.replace(
      new RegExp(
        '(?:(?:^|.*;)\\s*' +
          encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') +
          '\\s*\\=\\s*([^;]*).*$)|^.*$',
      ),
      '$1',
    ),
  ) || null

export const setCookie = (
  name: string,
  value: string,
  end?: number | string | Date,
  path?: string,
  domain?: string,
  secure?: boolean,
) => {
  if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
    return false
  }
  let sExpires = ''
  if (end) {
    switch (end.constructor) {
      case Number:
        sExpires =
          end === Infinity ? `; expires=${INFINITY_DATE}` : '; max-age=' + end
        break
      case String:
        sExpires = '; expires=' + end
        break
      case Date:
        sExpires = '; expires=' + (end as Date).toUTCString()
        break
    }
  }
  document.cookie =
    encodeURIComponent(name) +
    '=' +
    encodeURIComponent(value == null ? '' : value) +
    sExpires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '')
  return true
}
