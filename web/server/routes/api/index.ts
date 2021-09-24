import Router from 'koa-router'

import TestRouter from './test'
import dogRouter from './dog'
import userRouter from './user'

const router = new Router()

router.use('/test', TestRouter)
router.use('/dog', dogRouter)
router.use('/user', userRouter)

export default router.prefix('/api').routes()
