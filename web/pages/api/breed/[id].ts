/* eslint-disable no-case-declarations */
import { NextApiRequest, NextApiResponse } from 'next'

import { authorizator } from '@/pages/api/interceptor'
import { breedRepository } from '@/server/db/breed'

const breed = async (
  { query: { id }, method }: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    let result
    switch (method) {
      case 'GET':
        const breed = await breedRepository.findById(parseInt(id as string))
        if (breed) {
          result = {
            breed,
            message: 'Breed loading Success.',
          }
          return res.status(200).json(result)
        }
        result = {
          breed,
          message: 'Breed loading Failed.',
        }
        return res.status(404).json(result)
      default:
        return res.status(501).json({ alertText: 'Unexpected request Method!' })
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send('Unexpected Server Error')
  }
}

export default authorizator(breed)
