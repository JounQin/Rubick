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
  )

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
          end === Infinity
            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
            : '; max-age=' + end
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
    encodeURIComponent(value) +
    sExpires +
    (domain ? '; domain=' + domain : '') +
    (path ? '; path=' + path : '') +
    (secure ? '; secure' : '')
  return true
}
