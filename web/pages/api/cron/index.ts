import { NextApiRequest, NextApiResponse } from 'next'
import { authorizator } from '@/pages/api/interceptor'
import { cronRepository } from '@/server/db/cron'
import { CronCreateResultType } from '@/server/types/constant'
import { subscribeRepository } from '@/server/db/subscribe'

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
            message: '에러가 발생했습니다!',
          })
        }
        if (addCronResult.code === CronCreateResultType.EXISTED) {
          return res.status(400).json({
            success: false,
            data: addCronResult.cron ?? null,
            message: '이미 cron이 존재합니다. cron은 1개까지만 가능합니다!',
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
            message: 'cron 추가 성공!',
          })
        } else {
          return res.status(400).json({
            success: false,
            message: '에러가 발생했습니다!',
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
