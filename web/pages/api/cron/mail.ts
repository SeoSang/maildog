import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { db } from '@/server/db/knex'

type SubscribeDataPerUser = {
  userId: number
  breedId: number
  email: string
}

type ParsedSubscribeDataPerUser = {
  [userId: number]: {
    breedIdList: number[]
    email: string
  }
}

const mail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'POST':
        const { schedule } = req.body
        const result: SubscribeDataPerUser[] = await db
          .from('crons')
          .where('schedule', schedule)
          .andWhere('crons.valid', 1)
          .join('subscribes', 'crons.id', 'subscribes.cronId')
          .join('users', 'crons.userId', 'users.id')
          .select({
            userId: 'crons.userId',
            breedId: 'subscribes.breedId',
            email: 'users.email',
          })

        const subscribesPerUser: ParsedSubscribeDataPerUser = {}
        result?.forEach((data) => {
          if (!subscribesPerUser[data.userId]) {
            subscribesPerUser[data.userId] = {
              ...data,
              breedIdList: [data.breedId],
            }
          } else {
            subscribesPerUser[data.userId].breedIdList.push(data.breedId)
          }
        })
        return res.status(200).json({
          success: true,
          subscribesPerUser,
          message: 'Success!',
        })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .send({ success: false, message: 'Unexpected Server Error' })
  }
}

export default authorizator(mail)
