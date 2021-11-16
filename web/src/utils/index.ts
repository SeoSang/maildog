import { AxiosError } from 'axios'
import httpStatus from 'http-status'
import { NextApiResponse } from 'next'
import { CookieSerializeOptions, serialize } from 'cookie'

export const isValidEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const mail_format =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return Boolean(
    email.match(mail_format) && email.match(mail_format)?.length !== 0,
  )
}

export const alertErrorMessage = (error: AxiosError): void => {
  if (error.response?.status === httpStatus.INTERNAL_SERVER_ERROR) {
    alert('Server Error occur!')
    return
  }
  alert(error.response?.data?.message ?? 'Unexpected Error occur!')
}

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if (options && 'maxAge' in options) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options.expires = new Date(Date.now() + options?.maxAge)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}
