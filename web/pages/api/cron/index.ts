import { NextApiRequest, NextApiResponse } from 'next'
import { authorizator } from '@/pages/api/interceptor'

const cron = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        return res.status(200).json({})
      case 'POST':
        const { userId, type, breedIdList, schedule, count } = req.body
        cronRepose
        return res.status(200).json({})
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}

export default authorizator(cron)
