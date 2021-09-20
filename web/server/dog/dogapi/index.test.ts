import { error } from 'console'
import { getAllBreeds, upsertAllBreedsInfoToDB } from '.'
// import { upsertAllBreedsInfoToDB } from '.'

describe('dogapi/index test', () => {
  test('getAllBreeds test', async () => {
    const breeds = await getAllBreeds()
    console.log(breeds)
    console.log(breeds[0])
    return
  })
  test('upsert all breeds', async () => {
    try {
      await upsertAllBreedsInfoToDB()
    } catch (e) {
      error('error')
    }
  })
})