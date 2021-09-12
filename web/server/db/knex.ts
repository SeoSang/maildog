import knex from 'knex'

import { config } from './config/knexconfig'

export const db = knex(
  process.env.NODE_ENV === 'production'
    ? config.production
    : config.development,
)
