// import { find } from './breed'
import path from 'path'
import { find } from './breed'
import { createBreedsTable } from './create'

test('create breed table', async () => {
  await createBreedsTable()
  // const a = await find()
  // console.log(a)
})
test('is table exists', async () => {
  const a = await find()
  console.log(a)
})
