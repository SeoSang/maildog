import { getAllBreeds, upsertAllBreedsInfoToDB } from '.'
// import { upsertAllBreedsInfoToDB } from '.'

describe('dogapi/index test', () => {
  test('getAllBreeds test', async () => {
    const breeds = await getAllBreeds()
    console.log(breeds)
    console.log(breeds[0])
  })
  test('upsert all breeds', async () => {
    await upsertAllBreedsInfoToDB()
  })
})

// upsertAllBreedsInfoToDB()
