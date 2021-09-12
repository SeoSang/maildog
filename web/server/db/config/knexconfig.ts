import path from 'path'

export const config = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, './dev.sqlite3'),
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
      filename: path.resolve(__dirname, './prod.sqlite3'),
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
