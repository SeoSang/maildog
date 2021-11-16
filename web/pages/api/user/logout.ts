import { NextApiRequest, NextApiResponse } from 'next'
import httpStatus from 'http-status'
import { setCookie } from '@/src/utils'

export default async function logout(
  { method }: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = { message: 'Success' }
    let statusCode = 200

    switch (method) {
      case 'GET':
        return res.status(200).json(result)
      case 'POST': // User Login
        setCookie(res, 'godliam', '')
        statusCode = httpStatus.OK
        return res.status(statusCode)
      default:
        return res.status(501).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ messsage: 'Unexpected Server Error' })
  }
}
