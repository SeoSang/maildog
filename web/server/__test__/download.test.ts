import path from 'path'

import { downloadImage } from '@/server/download'

import breeds from '../db/json/breeds.json'

describe('download Images', () => {
  test(
    'download for all',
    async () => {
      const res = await Promise.all(
        breeds
          .filter((breed) => breed?.image?.url)
          .map((breed) => {
            return new Promise((resolve, reject) => {
              downloadImage(
                breed?.image?.url,
                path.resolve(__dirname, '../../public'),
                `${breed.name}.jpg`,
              )
                .then((suc) => resolve(suc))
                .catch((err) => reject(err))
            })
          }),
      )
      console.log(res)
    },
    1000 * 60 * 2,
  )
  test(
    'single',
    async () => {
      const res = await downloadImage(
        breeds[0]?.image?.url,
        path.resolve(__dirname, '../../public'),
        `Affenpinscher.jpg`,
      )
      console.log(res)
    },
    1000 * 60 * 2,
  )
})
