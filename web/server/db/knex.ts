import knex from 'knex'

import { config } from './config/knexconfig'

let knexConfig

switch (process.env.NODE_ENV) {
  case 'production':
    knexConfig = config.production
    break
  case 'test':
    knexConfig = config.test
    break
  default:
    knexConfig = config.development
    break
}

console.log(`db가 연결됩니다. (환경 : ${process.env.NODE_ENV})`)
console.log(`db 경로 : ${knexConfig?.connection?.filename}`)

export const db = knex(knexConfig)
