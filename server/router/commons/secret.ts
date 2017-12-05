import * as crypto from 'crypto'

import { ENCRYPT_SECRET } from './constants'

export const encrypt = (input: string, secret = ENCRYPT_SECRET) => {
  const cipher = crypto.createCipher('aes192', secret)
  return cipher.update(input, 'utf8', 'hex') + cipher.final('hex')
}

export const decrypt = (input: string, secret = ENCRYPT_SECRET) => {
  const decipher = crypto.createDecipher('aes192', secret)
  return decipher.update(input, 'hex', 'utf8') + decipher.final('utf8')
}
