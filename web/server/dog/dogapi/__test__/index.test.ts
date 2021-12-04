import { error } from 'console'

import {
  getAllBreeds,
  getBreedImageUrlsById,
  upsertAllBreedsInfoToDB,
} from '../index'
// import { upsertAllBreedsInfoToDB } from '.'

describe('dogapi/index test', () => {
  test('getAllBreeds test', async () => {
    const breeds = await getAllBreeds()
    console.log(breeds)
    console.log(breeds[0])
  })
  test('upsert all breeds', async () => {
    try {
      await upsertAllBreedsInfoToDB()
    } catch (e) {
      error('error')
    }
  })

  test('getBreedImagesById test', async () => {
    const test = await getBreedImageUrlsById({ breed_id: 1 })
    console.log(test)
  })
})
