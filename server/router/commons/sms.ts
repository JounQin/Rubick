import axios from 'axios'
import * as crypto from 'crypto'
import * as moment from 'moment'

import { CCP_CONFIG } from './config'
import { ENV, getEnv } from './env'

const { ACCOUNT_SID } = CCP_CONFIG

const SMS_BASE_URL = getEnv(ENV.SMS_BASE_URL)

const generateHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json;charset=utf-8',
  Authorization: new Buffer(
    `${ACCOUNT_SID}:${moment().format('YYYYMMDDHHmmss')}`,
  ).toString('base64'),
})

const generateSignature = () =>
  crypto
    .createHash('md5')
    .update(
      `${ACCOUNT_SID}${CCP_CONFIG.ACCOUNT_TOKEN}${moment().format(
        'YYYYMMDDHHmmss',
      )}`,
    )
    .digest('hex')

const generateUrl = () =>
  `${SMS_BASE_URL}/2013-12-26/Accounts/${
    ACCOUNT_SID
  }/SMS/TemplateSMS?sig=${generateSignature().toUpperCase()}`

export const sendSms = (to: string, code: string) =>
  axios.post(
    generateUrl(),
    {
      to,
      appId: CCP_CONFIG.APP_ID,
      templateId: CCP_CONFIG.TEMPLATE_ID,
      datas: [code, '60'],
    },
    {
      headers: generateHeaders(),
    },
  )
