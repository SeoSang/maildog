import { NextApiRequest, NextApiResponse } from 'next'
import httpStatus from 'http-status'
import { userRepository } from '@/server/db/user'

export default async function register(
  { method, body }: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let result
    let statusCode = 200
    switch (method) {
      case 'GET': // User register
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
