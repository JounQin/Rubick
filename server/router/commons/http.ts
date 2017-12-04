import axios from 'axios'
import { Context } from 'koa'
import * as _qs from 'qs'

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
  ctx?: Context
  url: string
  method?: HTTP_METHOD
  data?: string | object | any[]
  headers?: { [key: string]: string }
  params?: object | any[]
  qs?: boolean
}

export const jakiro = async <T = any>({
  ctx,
  url,
  method = GET,
  data,
  headers,
  params,
  qs,
}: JakiroOptions): Promise<{ result: T; status: number }> => {
  url = getEnv(ENV.API_SERVER_URL) + (/^\/v[12]/.test(url) ? url : `/v1${url}`)

  if (qs) {
    data = _qs.stringify(data)
  }

  headers = {
    'User-Agent': 'rubick/v1.0',
    ...headers,
  }

  if (ctx) {
    const requestId = ctx.get('alauda-request-id')

    if (requestId) {
      headers['Alauda-Request-ID'] = requestId
    }
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
      status: 502,
      error: e.message,
    } as any
  }

  const { data: res } = resp

  let result = res || {}

  const { status } = resp

  if (status >= 400 && (!res || !res.errors)) {
    result = {
      code: 'malformed_jakiro_response',
      source: '1019',
      message: resp.error || resp.text,
    }
  }

  return { result, status } as any
}
