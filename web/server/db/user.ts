import bcrypt from 'bcrypt'

import { db } from './knex'
import { KnexRepository } from '.'
import { UserInfo } from '../types/user'
import { CONSTANT_KEY_PASSWORD_ENCRYPT } from '../types/constant'

// TODO : 이거 해결
const KEY_PASSWORD_ENCRYPT = CONSTANT_KEY_PASSWORD_ENCRYPT || 13

export type UserValidateResult = {
  code: 'SUCCESS' | 'NOT_EXIST' | 'WRONG_PASSWORD'
  user?: UserInfo
}

const exceptPassword = (userInfo: UserInfo) => {
  return userInfo?.password ? { ...userInfo, password: undefined } : userInfo
}

class UserRepository extends KnexRepository<UserInfo> {
  async find(item: Partial<UserInfo>): Promise<UserInfo[]> {
    const users = await super.find(item)
    return users?.length !== 0 ? users.map((user) => exceptPassword(user)) : []
  }

  async findAll(limit: number): Promise<UserInfo[]> {
    const users = await super.findAll(limit)
    return users ? users.map((user) => exceptPassword(user)) : []
  }

  async findById(id: number): Promise<UserInfo> {
    const user = await super.findById(id)
    return exceptPassword(user)
  }

  async create(item: Omit<UserInfo, 'id'>): Promise<UserInfo> {
    if (!item?.password) {
      throw new Error('비밀번호가 없습니다!')
    }
    item.password = bcrypt.hashSync(item.password, KEY_PASSWORD_ENCRYPT)
    const user = await super.create(item)
    return exceptPassword(user)
  }

  async validate(email: string, password: string): Promise<UserValidateResult> {
    const [user] = await super.find({ email })
    if (!user?.password) {
      console.error('유저가 없거나 패스워드 데이터가 없습니다.')
      return {
        code: 'NOT_EXIST',
      }
    }
    return bcrypt.compareSync(password, user.password)
      ? { code: 'SUCCESS', user }
      : { code: 'WRONG_PASSWORD' }
  }
}

export const userRepository = new UserRepository(db, 'users')
