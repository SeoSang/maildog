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

// body 값을 바탕으로 메일을 보낸다.
router.post('/mail', async (ctx) => {
  const { mail, breeds } = ctx.request.body
  // ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

// cronId 를 바탕으로 메일을 보냄.
router.post('/mail/:cronId', async (ctx) => {
  // const { cronId } = ctx.params
  // ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

export default router.routes()
