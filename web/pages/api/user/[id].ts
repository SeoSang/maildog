/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from '@/server/db/user'
import httpStatus from 'http-status'

export default async function user(
  { query: { id }, method, body }: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let result
    let user
    let statusCode = 200
    switch (method) {
      case 'GET':
        user = await userRepository.findById(Number(id))
        if (user) {
          result = {
            user,
            message: 'User loading Success.',
          }
          return res.status(200).json(result)
        }
        result = {
          user,
          message: 'User loading Failed.',
        }
        return res.status(404).json(result)
      case 'PUT':
        const { email, name, phone, favorite, password } = body
        if (!email || !password) {
          result = {
            message: 'Email and password needed.',
          }
          return res.status(401).json(result)
        }
        const isValid =
          (await userRepository.validate(email, password))?.code === 'SUCCESS'
        if (!isValid) {
          result = {
            message: '이메일 또는 패스워드가 잘못됐습니다.',
          }
          statusCode = httpStatus.NOT_FOUND
          return
        }
        user = await userRepository.update(Number(id), {
          name,
          phone,
          favorite,
        })
        result = {
          user,
          message: '유저 업데이트에 성공했습니다.',
        }
        statusCode = httpStatus.OK
        return res.status(statusCode).json(result)
      default:
        return res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}
