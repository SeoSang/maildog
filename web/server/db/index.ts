import type { Knex } from 'knex'

interface Writer<T> {
  create(item: Omit<T, 'id'>): Promise<T>
  createMany(item: Omit<T, 'id'>[]): Promise<T[]>
  update(id: string, item: Partial<T>): Promise<boolean>
  upsert(item: Partial<T>): Promise<T[]>
  delete(id: string): Promise<boolean>
}
interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>
  findAll(limit: number): Promise<T[]>
  findById(id: string | Partial<T>): Promise<T>
  exist(id: string | Partial<T>): Promise<boolean>
}

type BaseRepository<T> = Writer<T> & Reader<T>

export abstract class KnexRepository<T> implements BaseRepository<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly knex: Knex, readonly tableName: string) {}

  // Shortcut for Query Builder call
  get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName)
  }

  async create(item: Omit<T, 'id'>): Promise<T> {
    const [output] = await this.qb.insert<T>(item).returning('*')

    return output as Promise<T>
  }

  createMany(items: T[]): Promise<T[]> {
    return this.qb.insert<T>(items) as Promise<T[]>
  }

  update(id: string, item: Partial<T>): Promise<boolean> {
    return this.qb.where('id', id).update(item)
  }

  upsert(item: Partial<T>): Promise<T[]> {
    return this.qb.insert<T>(item).onConflict('id').merge()
  }

  delete(id: string): Promise<boolean> {
    return this.qb.where('id', id).del()
  }

  find(item: Partial<T>): Promise<T[]> {
    return this.qb.where(item).select()
  }

  findById(id: string | Partial<T>): Promise<T> {
    return typeof id === 'string'
      ? this.qb.where('id', id).first()
      : this.qb.where(id).first()
  }

  findAll(limit: number): Promise<T[]> {
    return this.qb.limit(limit)
  }

  async exist(id: string | Partial<T>) {
    const query = this.qb.select<[{ count: number }]>(
      this.knex.raw('COUNT(*)::integer as count'),
    )

    if (typeof id !== 'string') {
      query.where(id)
    } else {
      query.where('id', id)
    }

    const exist = await query.first()

    return exist!.count !== 0
  }
}
