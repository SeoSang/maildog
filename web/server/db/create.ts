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
