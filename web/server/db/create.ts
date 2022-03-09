import { db } from './knex'

export const createBreedsTable = async () => {
  const exist = await db.schema.hasTable('breeds')
  if (exist) {
    console.log('breeds already exists')
    return
  }
  await db.schema.createTable('breeds', (tbl) => {
    tbl.text('id').unique().notNullable().primary()
    tbl.text('name').notNullable().unique()
    tbl.text('temperament')
    tbl.text('life_span')
    tbl.text('alt_names')
    tbl.text('wikipedia_url')
    tbl.text('origin')
    tbl.text('country_code')
    tbl.text('bred_for')
    tbl.text('breed_group')
    tbl.json('weight')
    tbl.json('height')
    tbl.json('image')
  })
}

export const createUsersTable = async () => {
  const exist = await db.schema.hasTable('users')
  if (exist) {
    console.log('users already exists')
    return
  }
  await db.schema.createTable('users', (tbl) => {
    tbl.increments() // id auto_increment
    tbl.timestamps() // created_at
    tbl.text('email').notNullable().unique()
    tbl.text('name')
    tbl.text('password').notNullable()
    tbl.text('phone')
    tbl.text('favorite')
    tbl.integer('priority').defaultTo(2)
    tbl.boolean('valid').notNullable().defaultTo(true)
  })
}

export const createCronsTable = async () => {
  const exist = await db.schema.hasTable('crons')
  if (exist) {
    console.log('crons already exists')
    return
  }
  await db.schema.createTable('crons', (tbl) => {
    tbl.increments() // id auto_increment
    tbl.timestamps() // created_at
    tbl.integer('user_id').references('id').inTable('users')
    tbl.text('expressions').notNullable()
    tbl.text('period').notNullable().defaultTo('Daily') // 1 : 하루에 1번, 2: 3일에 1번, 3: 7일에 1번
    tbl.text('type').notNullable().defaultTo('Email') // 1 : 이메일, 2: 카카오톡
    tbl.json('count')
    tbl.integer('priority').defaultTo(2)
    tbl.boolean('valid').notNullable().defaultTo(true)
  })
}

export const createSubscribesTable = async () => {
  const exist = await db.schema.hasTable('subscribes')
  if (exist) {
    console.log('subscribes already exists')
    return
  }
  await db.schema.createTable('subscribes', (tbl) => {
    tbl.increments() // id auto_increment
    tbl.timestamps() // created_at
    tbl.integer('cron_id').references('id').inTable('crons')
    tbl.integer('breed_id').references('id').inTable('breeds')
    tbl.boolean('valid').notNullable().defaultTo(true)
  })
}
