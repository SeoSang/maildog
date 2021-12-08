import { NextApiRequest, NextApiResponse } from 'next'
import { getBreedImageUrlsById } from '@/server/dog/dogapi'
import { BreedImageParam } from '@/server/dog/dogapi/type'
import { authorizator } from '@/pages/api/interceptor'

const images = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let result
    switch (req.method) {
      case 'GET':
        const imageParam: BreedImageParam = req.query
        const imageUrls = await getBreedImageUrlsById(imageParam)
        result = { imageUrls, message: 'success!' }
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

export default authorizator(images)
