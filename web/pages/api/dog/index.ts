import { NextApiRequest, NextApiResponse } from 'next'
import { findAll } from '@/server/db/breed'
import { authorizator } from '@/pages/api/interceptor'

const dog = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result, breeds
    switch (req.method) {
      case 'GET':
        breeds = await findAll()
        result = { message: 'All breeds loaded!', breeds }
        return res.status(200).json(result)
      default:
        return res
          .status(501)
          .json({ message: 'Unexpected request Method!', breeds: [] })
    }
  } catch (err) {
    console.log(err)
    return res
      .status(500)
      .send({ message: 'Unexpected server Error!', breeds: [] })
  }
}

export default authorizator(dog)
