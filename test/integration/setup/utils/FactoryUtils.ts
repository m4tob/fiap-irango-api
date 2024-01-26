/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@nestjs/common'

import { fakerPT_BR as faker } from '@faker-js/faker'
import { DataSource, ObjectLiteral, Repository } from 'typeorm'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import { Pedido } from '@/adapter/driven/entities/pedido'
import { Produto } from '@/adapter/driven/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

type IConstructable<T> = new () => T

// Simplified version of https://www.npmjs.com/package/typeorm-factory
export class Factory<T extends ObjectLiteral> {
  private index = 0
  private sequences: Record<string, (index: number, obj: any) => any> = {} as any
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
      obj[field] = await this.sequences[field](this.index++, obj)
    }

    return this.repository.save({ ...obj, ...(data || {}) } as T)
  }

  async createMany (count: number, data?: Partial<T>[]) {
    const objs = []

    for (let i = 0; i < count; i++) {
      const d = data?.[i] || {}
      objs.push(await this.create(d))
    }

    return objs
  }

  sequence (field: keyof T, callback: (index: number, obj: any) => any) {
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
      .sequence('nome', () => faker.commerce.productName())
      .sequence('imagemUrl', () => faker.image.url())
      .sequence('descricao', () => faker.lorem.paragraph())
      .sequence('preco', () => faker.number.float({ min: 0.01, max: 100, precision: 2 }))
      .sequence('categoria', () => faker.helpers.enumValue(ProdutoCategoriaEnum))
      .sequence('ingredientes', async () => {
        const ingredienteFactory = () => {
          return {
            id: faker.string.uuid(),
            nome: faker.commerce.productName(),
            imagemUrl: faker.image.url(),
            preco: faker.number.float({ min: 0.01, max: 50, precision: 2 })
          }
        }
        const count = faker.number.int({ min: 0, max: 5 })
        return Array(count).fill(1).map(ingredienteFactory)
      })
  }

  pedidoFactory = (): Factory<Pedido> => {
    return new Factory(Pedido, this.dataSource)
      .sequence('id', () => faker.number.int({ min: 1 }))
  }
}
