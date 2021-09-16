import { findAll } from './breed'
import { createBreedsTable, createUsersTable } from './create'

test('create breeds table', async () => {
  await createBreedsTable()
})
test('create users table', async () => {
  await createUsersTable()
})
test('is table exists', async () => {
  const a = await findAll()
  console.log(a)
})
