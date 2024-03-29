import httpStatus from 'http-status'
import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { userRepository } from '@/server/db/user'

const register = async (
  { method, body }: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let result
    let statusCode = 200
    switch (method) {
      case 'POST': // User register
        const { email, name, phone, favorite, password } = body
        const [user] = await userRepository.find({ email })
        if (user) {
          result = {
            user,
            message: '존재하는 이메일입니다.',
          }
          statusCode = httpStatus.NOT_FOUND
          return
        }
        const newUser = await userRepository.create({
          email,
          name,
          phone,
          password,
          favorite,
        })
        result = {
          user: newUser,
          message: '회원가입이 완료되었습니다!',
        }
        statusCode = httpStatus.OK
        return res.status(statusCode).json(result)
      default:
        return res.status(501).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).json({ messsage: 'Unexpected Server Error' })
  }
}

export default authorizator(register)
