/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'
import { userRepository } from '@/server/db/user'
import httpStatus from 'http-status'
import { authorizator } from '@/pages/api/interceptor'

const email = async (
  { method, body }: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let result
    let statusCode = 200
    switch (method) {
      case 'POST':
        const { email } = body
        const [user] = await userRepository.find({ email })
        if (user) {
          result = {
            message: 'Already exists.',
          }
          statusCode = httpStatus.NOT_FOUND
        } else {
          result = {
            message: 'You can use this email.',
          }
          statusCode = httpStatus.OK
        }
        return res.status(statusCode).json(result)
      default:
        return res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}

export default authorizator(email)
