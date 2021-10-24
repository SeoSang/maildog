import Router from 'koa-router'

import TestRouter from './test'
import dogRouter from './dog'
import userRouter from './user'
import mailRouter from './mail'

const router = new Router()

router.use('/test', TestRouter)
router.use('/dog', dogRouter)
router.use('/user', userRouter)
router.use('/mail', mailRouter)

export default router.prefix('/api').routes()
