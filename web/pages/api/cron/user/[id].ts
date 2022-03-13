/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { db } from '@/server/db/knex'
import { mapObjectValueToJSON } from '@/src/utils/objectUtils'

const user = async (
  { query: { id }, method }: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let result
    switch (method) {
      case 'GET':
        const cron = await db
          .from('crons')
          .where('userId', id)
          .join('subscribes', 'crons.id', 'subscribes.cronId')
          .select('subscribes.breedId as breedId')
          .join('breeds', 'breedId', 'breeds.id')
          .select('*')

        result = {
          cron: mapObjectValueToJSON(cron, ['weight, height, image']),
          message: 'Load cron Success.',
        }
        return res.status(200).json(result)
      default:
        return res.status(501).json({ message: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}

export default authorizator(user)
