import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'

const router = new Router()

// cron 을 추가
router.post('/', async (ctx) => {
  // ctx.request.body
  // ctx.body = { message: '모든 종 데이터 로드 완료', breeds }
  // ctx.state = StatusCodes.OK
  ctx.state = StatusCodes.OK
})

// TODO
// cron 수정
router.put('/:cronId', async (ctx) => {
  const { cronId } = ctx.params
  // ctx.body = { message: 'test' }
  console.log(cronId)
  ctx.state = StatusCodes.OK
})

export default router.routes()
