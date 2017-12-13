import axios from 'axios'
import * as _debug from 'debug'
import { Context } from 'koa'
import * as _qs from 'qs'

import { API_PREFIX_REGEXP } from './constants'
import { ENV, getEnv } from './env'

export enum HTTP_METHOD {
  DELETE = 'delete',
  GET = 'get',
  HEAD = 'head',
  PATCH = 'patch',
  POST = 'post',
  PUT = 'put',
}

interface JakiroOptions {
  ctx: Context
  url?: string
  method?: HTTP_METHOD
  data?: string | object | any[]
  headers?: { [key: string]: string }
  params?: object | any[]
  qs?: boolean
}

const debug = _debug('rubick:jakiro')

export const jakiro = async <T = any>({
  ctx,
  url = ctx.url,
  method = ctx.method,
  data = ctx.request.body,
  headers,
  params = ctx.query,
  qs,
}: JakiroOptions): Promise<{ result: T; status: number }> => {
  url = url.replace(API_PREFIX_REGEXP, '/')
  url = getEnv(ENV.API_SERVER_URL) + (/^\/v[12]/.test(url) ? url : `/v1${url}`)

  if (qs) {
    data = _qs.stringify(data)
  }

  const { user } = ctx.session

  headers = {
    ...headers,
    'Alauda-Request-ID': ctx.get('alauda-request-id'),
    'User-Agent': 'rubick/v1.0',
  }

  if (user) {
    headers.Authorization = `Token ${user.token}`
  }

  let resp

  try {
    resp = await axios.request<T>({
      url,
      method,
      data,
      params,
      headers,
    })
  } catch (e) {
    resp = {
      data: e.response.data,
      error: e.message,
      status: e.response.status,
    } as any
  }

  const { data: res } = resp

  let result = res || {}

  const { status } = resp

  if (status >= 400 && (!res || !res.errors)) {
    result = {
      code: 'malformed_jakiro_response',
      source: '1019',
      error: resp.error,
    }
  }

  debug('\nurl:%s\nresult: %O\nstatus:%d', url, result, status)

  if (result.errors) {
    result.error = result.errors[0]
    result.code = result.error.code
    delete result.errors
  }

  if (result.error) {
    throw { result, status }
  }

  return { result, status }
}
