import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

export default router.routes()