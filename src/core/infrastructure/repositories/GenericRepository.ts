/* eslint-disable @typescript-eslint/no-explicit-any */

import { DeleteResult, ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm'

import { IGenericRepository, Relation } from '@/core/infrastructure/repositories/IGenericRepository'

export abstract class GenericRepository<MODEL_TYPE extends ObjectLiteral, ID_TYPE> implements IGenericRepository<MODEL_TYPE, ID_TYPE> {
  constructor (protected model: Repository<MODEL_TYPE>, protected table: string) {
  }

  async save (model: MODEL_TYPE): Promise<MODEL_TYPE> {
    return this.model.save(model)
  }

  async saveMany (models: MODEL_TYPE[]): Promise<MODEL_TYPE[]> {
    return this.model.save(models)
  }

  private addRelations = (query: SelectQueryBuilder<MODEL_TYPE>, relations?: (Relation | string)[]) => {
    if (!relations?.length) return

    relations.forEach(relation => {
      if (typeof relation === 'string') {
        query.leftJoinAndSelect(`${this.table}.${relation}`, relation)
        return
      }

      const alias = relation.field.split('.').pop() || relation.field
      if (relation.join === 'inner') {
        query.innerJoinAndSelect(`${relation.field}`, alias, relation.condition)
      } else {
        query.leftJoinAndSelect(`${relation.field}`, alias, relation.condition)
      }
    })
  }

  async findAll (relations?: (Relation | string)[]): Promise<MODEL_TYPE[]> {
    const query = this.model
      .createQueryBuilder(this.table)

    this.addRelations(query, relations)

    return query.getMany()
  }

  async findById (id: ID_TYPE, relations?: (Relation | string)[]): Promise<MODEL_TYPE | null> {
    const query = this.model
      .createQueryBuilder(this.table)
      .where(`${this.table}.id = :id`, { id })

    this.addRelations(query, relations)

    return query.getOne()
  }

  async findOneBy (values: Record<string, any>, relations?: (Relation | string)[]): Promise<MODEL_TYPE | null> {
    const query = this.model
      .createQueryBuilder(this.table)

    Object.keys(values).forEach(key => {
      const isArray = Array.isArray(values[key])
      if (isArray) {
        query.andWhere(`${key} IN (:...${key})`, { [key]: values[key] })
      } else {
        query.andWhere(`${key} = :${key}`, { [key]: values[key] })
      }
    })

    this.addRelations(query, relations)

    return query.getOne()
  }

  async findManyBy (values: Record<string, any>, relations?: (Relation | string)[]): Promise<MODEL_TYPE[]> {
    const query = this.model
      .createQueryBuilder(this.table)

    Object.keys(values).forEach(key => {
      const isArray = Array.isArray(values[key])
      if (isArray) {
        query.andWhere(`${key} IN (:...${key})`, { [key]: values[key] })
      } else {
        query.andWhere(`${key} = :${key}`, { [key]: values[key] })
      }
    })

    this.addRelations(query, relations)

    return query.getMany()
  }

  async findManyById (ids: ID_TYPE[], relations?: (Relation | string)[]): Promise<MODEL_TYPE[]> {
    const query = this.model
      .createQueryBuilder(this.table)
      .where('id IN (:...ids)', { ids })

    this.addRelations(query, relations)

    return query.getMany()
  }

  async deleteBy (values: Record<string, any>): Promise<DeleteResult> {
    const query = this.model
      .createQueryBuilder(this.table)

    Object.keys(values).forEach(key => {
      const isArray = Array.isArray(values[key])
      if (isArray) {
        query.andWhere(`${key} IN (:...${key})`, { [key]: values[key] })
      } else {
        query.andWhere(`${key} = :${key}`, { [key]: values[key] })
      }
    })

    return query.delete().execute()
  }

  async delete (id: ID_TYPE): Promise<DeleteResult> {
    return this.model
      .createQueryBuilder(this.table)
      .delete()
      .where('id = :id', { id })
      .execute()
  }

  async deleteMany (ids: ID_TYPE[]): Promise<DeleteResult> {
    return this.model
      .createQueryBuilder(this.table)
      .delete()
      .where('id IN (:...ids)', { ids })
      .execute()
  }
}
