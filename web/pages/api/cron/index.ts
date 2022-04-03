import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { cronRepository } from '@/server/db/cron'
import { subscribeRepository } from '@/server/db/subscribe'
import { CronCreateResultType } from '@/server/types/constant'

const cron = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json({})
      case 'POST':
        const { userId, type, breedIdList, schedule, count } = req.body
        const addCronResult = await cronRepository.add({
          userId,
          type,
          schedule,
          count,
        })
        if (addCronResult.code === CronCreateResultType.ERROR) {
          return res.status(400).json({
            success: false,
            message: 'Error occur',
          })
        }
        if (addCronResult.code === CronCreateResultType.EXISTED) {
          return res.status(400).json({
            success: false,
            data: addCronResult.cron ?? null,
            message: 'Cron already exist. Cron can be single.',
          })
        }

        if (addCronResult?.cron?.id) {
          await subscribeRepository.createMany(
            breedIdList.map((breedId: number) => ({
              cronId: addCronResult?.cron?.id,
              breedId,
            })),
          )
          return res.status(200).json({
            success: true,
            message: 'Add cron success!',
          })
        } else {
          return res.status(400).json({
            success: false,
            message: 'Add cron Error occur!',
          })
        }
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .send({ success: false, message: 'Unexpected Server Error' })
  }
}

export default authorizator(cron)
