import { findAll } from '../breed'
import {
  createBreedsTable,
  createUsersTable,
  createCronsTable,
} from '../create'

test('create breeds table', async () => {
  await createBreedsTable()
})
test('create users table', async () => {
  await createUsersTable()
})
test('create crons table', async () => {
  await createCronsTable()
})
test('is table exists', async () => {
  const a = await findAll()
  console.log(a)
})
