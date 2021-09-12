import knex from 'knex'

import { config } from './config/knexconfig'

let knexConfig

switch (process.env.NODE_ENV) {
  case 'production':
    knexConfig = config.production
    console.log('production!!!')
    break
  case 'test':
    knexConfig = config.test
    console.log('test!!!')
    break
  default:
    knexConfig = config.development
    console.log('development!!!')
    break
}

export const db = knex(knexConfig)
