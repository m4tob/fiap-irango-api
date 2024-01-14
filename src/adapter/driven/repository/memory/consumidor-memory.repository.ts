import { Injectable } from '@nestjs/common'

import Consumidor from 'src/core/domain/entities/consumidor'
import IConsumidorRepository from 'src/core/domain/repositories/iconsumidor.repository'

@Injectable()
export default class ConsumidorMemoryRepository implements IConsumidorRepository {
  private consumidors: Consumidor[] = []
  async create (input: Consumidor): Promise<void> {
    this.consumidors.push(input)
  }

  findById (id: string): Promise<Consumidor | undefined> {
    return Promise.resolve(
      this.consumidors.find((consumidor) => consumidor.id === id),
    )
  }

  async save (input: Consumidor): Promise<void> {
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
}
