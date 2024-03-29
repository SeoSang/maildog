import path from 'path'

const PATH_PREFIX = process.cwd()

export const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(PATH_PREFIX, './server/db/config/dev.sqlite3'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './dev.sqlite3'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'sqlite3',
    connection: {
      filename: process.env.DB_PATH ?? '/var/tmp/prod.sqlite3',
    },
    useNullAsDefault: true,
  },
}

/**
 * production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
 */
