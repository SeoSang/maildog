/* eslint-disable no-case-declarations */
import httpStatus from 'http-status'
import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { cronRepository } from '@/server/db/cron'
import { userRepository } from '@/server/db/user'

const user = async (
  { query: { id }, method, body }: NextApiRequest,
  res: NextApiResponse,
) => {
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
          message: 'User Update Success!',
        }
        statusCode = httpStatus.OK
        return res.status(statusCode).json(result)
      case 'DELETE':
        const data = await cronRepository.delete('userId', id)
        result = {
          data,
          message: 'User Cron delete Success',
        }
        return res.status(statusCode).json(result)
      default:
        return res.status(501).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}

export default authorizator(user)
