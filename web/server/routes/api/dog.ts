import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'

import { findAll } from '../../db/breed'

const router = new Router()

router.get('/', async (ctx) => {
  const breeds = await findAll()
  ctx.body = { message: '모든 종 데이터 로드 완료', breeds }
  ctx.state = StatusCodes.OK
})

router.get('/test', async (ctx) => {
  ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

export default router.routes()
