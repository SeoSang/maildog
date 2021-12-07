import { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from '@/server/db/user'
import httpStatus from 'http-status'
import { encryptObject } from '@/src/utils/encrypt'
import { setCookie } from '@/src/utils'

export default async function user(
  { method, body }: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let result: any = { message: 'Success' }
    let statusCode = 200
    switch (method) {
      case 'GET':
        return res.status(200).json(result)
      case 'POST': // User Login
        const { email, password } = body
        const { user, code } = await userRepository.validate(email, password)
        if (code === 'NOT_EXIST') {
          result = {
            user,
            message: 'Not existed e-mail.',
          }
          statusCode = httpStatus.NOT_FOUND
        } else if (code === 'SUCCESS') {
          result = {
            user,
            message: 'Login Success.',
          }
          statusCode = httpStatus.OK
          if (!user?.id) {
            return
          }
          const encryptedUserId = encryptObject(user)
          setCookie(res, 'godliam', encryptedUserId)
        } else {
          result = {
            user,
            message: 'Login Failed',
          }
          statusCode = httpStatus.BAD_REQUEST
        }
        return res.status(statusCode).json(result)
      default:
        return res.status(501).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ messsage: 'Unexpected Server Error' })
  }
}
