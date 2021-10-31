/* eslint-disable require-atomic-updates */
import { Next, ParameterizedContext } from 'koa'
import Router from 'koa-router'
import { StatusCodes } from 'http-status-codes'

import { userRepository } from '../../db/user'

const router = new Router()

const numericIdValidator = async (ctx: ParameterizedContext, next: Next) => {
  const { id } = ctx.params
  if (!id) {
    await next()
  }
  if (isNaN(Number(id))) {
    ctx.body = {
      message: 'id 정보가 잘못되었습니다.',
    }
    ctx.status = 401
  }
  await next()
}

router.get('/', async (ctx) => {
  ctx.body = { message: 'TODO' }
  ctx.state = StatusCodes.OK
})

router.get('/register', async (ctx) => {
  const { email, name, phone, favorite, password } = ctx.request.body
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
})

router.post('/email', async (ctx) => {
  const { email } = ctx.request.body
  const [user] = await userRepository.find({ email })
  if (user) {
    ctx.body = {
      message: 'Already exists.',
    }
    ctx.status = 404
  } else {
    ctx.body = {
      message: 'You can use this email.',
    }
    ctx.status = 200
  }
})

// TODO : register Cron
router.post('/:id/cron', async (ctx) => {
  const { cronId } = ctx.params
  // ctx.body = { message: 'test' }
  console.log(cronId)
  ctx.body = { message: 'test' }
  ctx.state = StatusCodes.OK
})

// 유저 로드
router.get('/:id', numericIdValidator, async (ctx) => {
  const { id } = ctx.params
  const user = await userRepository.findById(Number(id))
  if (user) {
    ctx.body = {
      user,
      message: '유저 정보 로드에 성공하였습니다.',
    }
    ctx.status = 200
  } else {
    ctx.body = {
      user,
      message: '존재하지 않는 유저입니다!',
    }
    ctx.status = 404
  }
})

// 유저 로그인
router.post('/:id', numericIdValidator, async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await userRepository.validate(email, password)
  if (user?.code === 'NOT_EXIST') {
    ctx.body = {
      user,
      message: '존재하지 않는 이메일입니다.',
    }
    ctx.status = 404
  } else if (user?.code === 'SUCCESS') {
    ctx.body = {
      user,
      message: '유저 로그인에 성공하였습니다.',
    }
    ctx.status = 200
  } else {
    ctx.body = {
      user,
      message: '유저 로그인에 실패했습니다!',
    }
    ctx.status = 404
  }
})

// 유저 수정
router.put('/:id', numericIdValidator, async (ctx) => {
  const { id } = ctx.params
  const { email, name, phone, favorite, password } = ctx.request.body
  if (!email || !password) {
    ctx.body = {
      message: '유저 수정을 위해서는 이메일과 패스워드가 필요합니다.',
    }
    ctx.status = 401
    return
  }
  const isValid =
    (await userRepository.validate(email, password))?.code === 'SUCCESS'
  if (!isValid) {
    ctx.body = {
      message: '이메일 또는 패스워드가 잘못됐습니다.',
    }
    ctx.status = 404
    return
  }
  const user = await userRepository.update(Number(id), {
    name,
    phone,
    favorite,
  })
  ctx.body = {
    user,
    message: '유저 업데이트에 성공했습니다.',
  }
  ctx.status = 200
})

export default router.routes()
