/* eslint-disable require-atomic-updates */
import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'

import { userRepository } from '../../db/user'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = { message: 'TODO' }
  ctx.state = StatusCodes.OK
})

// TODO : load User
router.get('/:userId', async (ctx) => {
  const { userId } = ctx.params
  try {
    const user = await userRepository.findById(Number(userId))
    if (user) {
      ctx.body = {
        user,
        message: '유저 정보 로드에 성공하였습니다.'
      }
      ctx.status = 200
    }
    else {
      ctx.body = {
        user,
        message: '존재하지 않는 유저입니다!'
      }
      ctx.status = 404
    }
  }
})

router.get('/register', async (ctx) => {
  const { email, name, phone, favorite, password } = ctx.request.body
  try {
    const [user] = await userRepository.find({ email })
    if (user) {
      ctx.body = {
        user,
        message: '존재하는 이메일입니다.',
      }
      ctx.status = 404
      return
    }
    const newUser = await userRepository.create({
      email,
      name,
      phone,
      password,
      favorite,
    })
    ctx.body = {
      user: newUser,
      message: '회원가입이 완료되었습니다!',
    }
    ctx.status = 200
    return
  } catch (e) {
    ctx.body = { message: '서버 에러가 발생했습니다.' }
    ctx.status = 500
  }
})

router.post('/email', async (ctx) => {
  const { email } = ctx.request.body
  const [user] = await userRepository.find({ email })
  if (user) {
    ctx.body = {
      user,
      message: '존재하는 이메일입니다.',
    }
    ctx.status = 404
  } else {
    ctx.body = {
      user: null,
      message: '사용 가능한 이메일입니다.',
    }
    ctx.status = 200
  }
  console.log(user)
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
