import type { Knex } from 'knex'

export type DeleteResult = 1 | 0

interface Writer<T> {
  create(item: Omit<T, 'id'>): Promise<T | undefined>

  createMany(item: Omit<T, 'id'>[]): Promise<boolean>

  update(id: number, item: Partial<T>): Promise<T>

  upsert(item: Partial<T>): Promise<T[]>

  delete(column: string, value: any): Promise<DeleteResult>

  deleteById(id: number): Promise<boolean>
}

interface Reader<T> {
  find(item: Partial<T>): Promise<T[]>

  findAll(limit: number): Promise<T[]>

  findById(id: number | Partial<T>): Promise<T>

  exist(id: number | Partial<T>): Promise<boolean>
}

type BaseRepository<T> = Writer<T> & Reader<T>

interface TimeStampData {
  created_at?: Knex.Raw | string
}

export abstract class KnexRepository<T extends TimeStampData>
  implements BaseRepository<T>
{
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly knex: Knex, readonly tableName: string) {}

  // Shortcut for Query Builder call
  get qb(): Knex.QueryBuilder {
    return this.knex(this.tableName)
  }

  // FIXME : 성능 개선 가능인 부분
  async create(item: Omit<T, 'id'>): Promise<T> {
    if (!item.created_at) {
      item.created_at = this.knex.fn.now()
    }
    const [id] = await this.qb.insert(item)
    const result = await this.findById(id)
    return result
  }

  async createMany(items: Omit<T, 'id'>[]): Promise<boolean> {
    const includingTimeStampItems = items.map((item) =>
      item.created_at ? item : { ...item, created_at: new Date() },
    )
    try {
      await this.qb.insert<T>(includingTimeStampItems)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  async update(id: number, item: Partial<T>): Promise<T> {
    await this.qb.where('id', id).update(item)
    return this.findById(id)
  }

  upsert(item: Partial<T>): Promise<T[]> {
    return this.qb.insert<T>(item).onConflict('id').merge()
  }

  delete(column: string, value: any): Promise<DeleteResult> {
    return this.qb.where(column, value).del()
  }

  deleteById(id: number): Promise<boolean> {
    return this.qb.where('id', id).del()
  }

  find(item: Partial<T>): Promise<T[]> {
    return this.qb.where(item).select()
  }

  findAll(limit: number): Promise<T[]> {
    return this.qb.limit(limit)
  }

  findById(id: number | Partial<T>): Promise<T> {
    return typeof id === 'number'
      ? this.qb.where('id', id).first()
      : this.qb.where(id).first()
  }

  async exist(id: number | Partial<T>) {
    const query = this.qb.select<[{ count: number }]>(
      this.knex.raw('COUNT(*)::integer as count'),
    )

    if (typeof id !== 'number') {
      query.where(id)
    } else {
      query.where('id', id)
    }

    const exist = await query.first()

    return exist!.count !== 0
  }

  destroy() {
    this.destroy()
  }
}
