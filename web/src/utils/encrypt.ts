import CryptoJS from 'crypto-js'
import { CONSTANT_KEY_PASSWORD_ENCRYPT } from '@/server/types/constant'
import { parseJSON, stringifyJSON } from '@/src/utils/objectUtils'
import { UserInfo } from '@/server/types/user'

export const encryptString = (str: string): string => {
  return CryptoJS.AES.encrypt(
    str,
    CONSTANT_KEY_PASSWORD_ENCRYPT.toString(),
  ).toString()
}

export const encryptObject = (obj: Object): string => {
  return encryptString(stringifyJSON(obj))
}

export const decryptToString = (str: string): string => {
  return CryptoJS.AES.decrypt(
    str,
    CONSTANT_KEY_PASSWORD_ENCRYPT.toString(),
  ).toString(CryptoJS.enc.Utf8)
}

export const decryptToObject = (str: string): object => {
  return parseJSON(decryptToString(str))
}

export const decryptToUser = (str: string): UserInfo => {
  return parseJSON(decryptToString(str))
}
