import caxios from '@/server/cron/caxios'
import { addCron } from '@/server/cron'

describe('cronapi/index test', () => {
  test('caxios test', async () => {
    const res = await caxios.get('/')
    console.log(res)
  })

  test('addCron test', async () => {
    const res = await addCron({
      url: 'https://www.naver.com',
      cron_expression: '* * * * * *',
    })
    console.log(res)
  })
})
