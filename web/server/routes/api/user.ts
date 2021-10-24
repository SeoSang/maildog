import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'

const router = new Router()

// TODO : register User
router.get('/', async (ctx) => {
  ctx.body = { message: 'TODO' }
  ctx.state = StatusCodes.OK
})

// TODO : update User
router.get('/:userId', async (ctx) => {
  const { userId } = ctx.params
  // ctx.body = { message: 'test' }
  console.log(userId)
  ctx.body = { message: 'TODO' }
  ctx.state = StatusCodes.OK
})

router.get('/test', async (ctx) => {
  ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

// TODO : register Cron
router.post('/:userId/cron', async (ctx) => {
  const { cronId } = ctx.params
  // ctx.body = { message: 'test' }
  console.log(cronId)
  ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

export default router.routes()
