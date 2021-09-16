import Router from 'koa-router'

import TestRouter from './test'
import dogRouter from './dog'

const router = new Router()

router.use('/test', TestRouter)
router.use('/dog', dogRouter)

export default router.prefix('/api').routes()
