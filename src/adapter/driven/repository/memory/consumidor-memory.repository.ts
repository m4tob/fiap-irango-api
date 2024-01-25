import { Injectable } from '@nestjs/common'

import Consumidor from '@/core/domain/entities/consumidor'
import IConsumidorRepository from '@/core/domain/repositories/iconsumidor.repository'
import Cpf from '@/core/domain/value-object/Cpf'

@Injectable()
export default class ConsumidorMemoryRepository implements IConsumidorRepository {
  private consumidors: Consumidor[] = []
  async create (input: Consumidor): Promise<Consumidor> {
    this.consumidors.push(input)
    return input
  }

  async findById (id: string): Promise<Consumidor | undefined> {
    return this.consumidors.find((c) => c.id === id)
  }

  async save (input: Consumidor): Promise<Consumidor> {
    const index = this.consumidors.findIndex(
      (consumidor) => consumidor.id === input.id,
    )

    if (index !== -1) {
      this.consumidors.splice(index, 1)
    }

    return this.create(input)
  }

  async find (): Promise<Consumidor[]> {
    return this.consumidors
  }

  async findByCPF (cpf: Cpf): Promise<Consumidor | undefined> {
    return this.consumidors.find((c) => c.cpf.getValue() === cpf.getValue())
  }
}
