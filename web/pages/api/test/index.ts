import { NextApiRequest, NextApiResponse } from 'next'
import { findAll } from '@/server/db/breed'

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  try {
    let result, breeds
    switch (req.method) {
      case 'GET':
        breeds = await findAll()
        result = { message: '모든 종 데이터 로드 완료', breeds }
        return res.status(200).json(result)
      case 'POST':
        result = await UserModel.create(req.body)
        return res.status(200).json(result)
      default:
        return res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}
