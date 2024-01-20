import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import Consumidor from 'src/core/domain/entities/consumidor'
import IConsumidorRepository from 'src/core/domain/repositories/iconsumidor.repository'
import { Repository } from 'typeorm'

import { BusinessException } from '@/core/domain/errors/business-exception'
import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'
import Cpf from '@/core/domain/value-object/Cpf'

import { Consumidor as Entity } from '../../entities/consumidor'

@Injectable()
export default class ConsumidorTypeormRepository implements IConsumidorRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Consumidor): Promise<void> {
    const consumidor = ConsumidorMapper.toConsumidorDto(input)
    await this.repository.insert(consumidor)
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
      throw new BusinessException('Consumidor não existe')
    }

    await this.repository.update(input.id, ConsumidorMapper.toConsumidorDto(input))
  }

  async find (): Promise<Consumidor[]> {
    const consumidors = await this.repository.find()

    return consumidors.map(consumidor => {
      return ConsumidorMapper.toDtoForConsumidor(consumidor)
    })
  }

  async findByCPF (cpf: Cpf): Promise<Consumidor | undefined> {
    const consumidor = await this.repository.findOneBy({
      cpf: cpf.getValue()
    })

    return consumidor ? ConsumidorMapper.toDtoForConsumidor(consumidor) : undefined
  }
}
