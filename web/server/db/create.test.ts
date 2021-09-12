import { find } from './breed'
import { createBreedsTable } from './create'

test('create breed table', async () => {
  await createBreedsTable()
})
test('is table exists', async () => {
  const a = await find()
  console.log(a)
})
