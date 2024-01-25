/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common'

import { fakerPT_BR as faker } from '@faker-js/faker'
import { DataSource, ObjectLiteral, Repository } from 'typeorm'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import { Pedido } from '@/adapter/driven/entities/pedido'
import { Produto } from '@/adapter/driven/entities/produto'

type IConstructable<T> = new () => T

// Simplified version of https://www.npmjs.com/package/typeorm-factory
export class Factory<T extends ObjectLiteral> {
  private index = 0
  private sequences: Record<string, (index: number) => any> = {} as any
  private Entity: IConstructable<T>
  private privateRepository: Repository<T> | undefined = undefined

  constructor (Entity: IConstructable<T>, private dataSource: DataSource) {
    this.Entity = Entity
  }

  private get repository () {
    this.privateRepository = this.privateRepository || this.dataSource.getRepository(this.Entity)
    return this.privateRepository
  }

  async create (data?: Partial<T>) {
    const obj: any = new this.Entity()

    for (const field in this.sequences) {
      obj[field] = this.sequences[field](this.index++)
    }

    return this.repository.save({ ...obj, ...(data || {}) } as T)
  }

  async createMany (count: number, data: Partial<T>[]) {
    const objs = []

    for (let i = 0; i < count; i++) {
      const d = data[i] || {}
      objs.push(await this.create(d))
    }

    return objs
  }

  sequence (field: keyof T, callback: (index: number) => any) {
    this.sequences[field as string] = callback
    return this
  }
}

@Injectable()
export default class FactoryUtils {
  constructor (private dataSource: DataSource) {
  }

  consumidorFactory = (): Factory<Consumidor> => {
    return new Factory(Consumidor, this.dataSource)
      .sequence('id', () => faker.string.uuid())
      .sequence('email', () => faker.internet.email())
      .sequence('nome', () => faker.person.firstName())
      .sequence('cpf', () => faker.string.numeric(11))
  }

  produtoFactory = (): Factory<Produto> => {
    return new Factory(Produto, this.dataSource)
      .sequence('id', () => faker.string.uuid())
  }

  pedidoFactory = (): Factory<Pedido> => {
    return new Factory(Pedido, this.dataSource)
      .sequence('id', () => faker.number.int({ min: 1 }))
  }
}
