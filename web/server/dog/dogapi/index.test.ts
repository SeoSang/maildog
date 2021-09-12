import { getAllBreeds } from '.'

describe('dogapi/index test', () => {
  test('getAllBreeds test', async () => {
    const breeds = await getAllBreeds()
    console.log(breeds)
    console.log(breeds[0])
  })
})
