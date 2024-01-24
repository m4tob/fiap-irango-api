/* eslint-disable @typescript-eslint/no-explicit-any */

import { fakerPT_BR as faker } from '@faker-js/faker'
import { getRepository, Repository, ObjectLiteral } from 'typeorm'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import { Pedido } from '@/adapter/driven/entities/pedido'
import { Produto } from '@/adapter/driven/entities/produto'

type IConstructable<T> = new () => T

// Simplified version of https://www.npmjs.com/package/typeorm-factory
class Factory<T extends ObjectLiteral> {
  private index = 0
  private sequences: Record<string, (index: number) => any> = {} as any
  private Entity: IConstructable<T>
  private privateRepository: Repository<T> | undefined = undefined

  constructor (Entity: IConstructable<T>) {
    this.Entity = Entity
  }

  private get repository () {
    this.privateRepository = this.privateRepository || getRepository(this.Entity)
    return this.privateRepository
  }

  async create (data: Partial<T>) {
    const obj: any = new this.Entity()
    for (const field in this.sequences) {
      obj[field] = this.sequences[field](this.index++)
    }
    return this.repository.save({ ...obj, ...data } as T)
  }

  sequence (field: keyof T, callback: (index: number) => any) {
    this.sequences[field as string] = callback
    return this
  }
}

export default class FactoryUtils {
  consumidorFactory = async () => {
    return new Factory(Consumidor)
      .sequence('id', () => faker.string.uuid())
      .sequence('email', () => faker.internet.email())
      .sequence('nome', () => faker.person.firstName())
      .sequence('cpf', () => faker.string.numeric(11).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'))
  }

  produtoFactory = async () => {
    return new Factory(Produto)
      .sequence('id', () => faker.string.uuid())
  }

  pedidoFactory = async () => {
    return new Factory(Pedido)
      .sequence('id', () => faker.number.int({ min: 1 }))
  }
}
