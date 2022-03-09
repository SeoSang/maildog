import { findAll } from '../breed'
import {
  createBreedsTable,
  createCronsTable,
  createSubscribesTable,
  createUsersTable,
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
test('create subscribes table', async () => {
  await createSubscribesTable()
})
test('is table exists', async () => {
  const a = await findAll()
  console.log(a)
})
