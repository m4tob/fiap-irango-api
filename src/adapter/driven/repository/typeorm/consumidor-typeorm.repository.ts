import { Inject, Injectable } from '@nestjs/common'

import Consumidor from 'src/core/domain/entities/consumidor'
import IConsumidorRepository from 'src/core/domain/repositories/iconsumidor.repository'
import { Repository } from 'typeorm'

import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'

import { Consumidor as Entity } from '../../entities/consumidor'

@Injectable()
export default class ConsumidorTypeormRepository implements IConsumidorRepository {
  constructor (
    @Inject('CONSUMIDOR_REPOSITORY')
    private repository: Repository<Entity>,
  ) {}

  async create (input: Consumidor): Promise<void> {
    const tt = ConsumidorMapper.toConsumidorDto(input)
    await this.repository.insert(tt)
  }

  async findById (id: string): Promise<Consumidor | undefined> {
    const consumidor = await this.repository.findOneBy({
      id
    })

    return consumidor ? ConsumidorMapper.toDtoForConsumidor(consumidor) : undefined
  }

  async save (input: Consumidor): Promise<void> {
    const consumidor = await this.findById(input.id)

    if (!consumidor) {
      throw new Error('Consumidor não existe')
    }

    await this.repository.update(input.id, ConsumidorMapper.toConsumidorDto(input))
  }

  async find (): Promise<Consumidor[]> {
    return []
  }
}
