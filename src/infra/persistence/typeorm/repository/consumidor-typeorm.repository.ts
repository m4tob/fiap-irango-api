import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import Consumidor from '@/core/domain/entities/consumidor'
import BusinessException from '@/core/domain/errors/business-exception'
import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'
import IConsumidorRepository from '@/core/domain/repositories/iconsumidor.repository'
import Cpf from '@/core/domain/value-object/Cpf'
import { Consumidor as Entity } from '@/infra/persistence/typeorm/entities/consumidor'

@Injectable()
export default class ConsumidorTypeormRepository implements IConsumidorRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Consumidor): Promise<Consumidor> {
    const consumidor = ConsumidorMapper.toDto(input)

    await this.repository.insert(consumidor)

    return input
  }

  async findById (id: string): Promise<Consumidor | undefined> {
    const consumidor = await this.repository.findOneBy({
      id
    })

    return consumidor ? ConsumidorMapper.toDomainEntity(consumidor) : undefined
  }

  async save (input: Consumidor): Promise<Consumidor> {
    const consumidor = await this.findById(input.id)
    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    await this.repository.update(consumidor.id, ConsumidorMapper.toDto(input))

    return consumidor
  }

  async find (): Promise<Consumidor[]> {
    const consumidors = await this.repository.find()

    return consumidors.map(consumidor => {
      return ConsumidorMapper.toDomainEntity(consumidor)
    })
  }

  async findByCPF (cpf: Cpf): Promise<Consumidor | undefined> {
    const consumidor = await this.repository.findOneBy({
      cpf: cpf.getValue()
    })

    return consumidor ? ConsumidorMapper.toDomainEntity(consumidor) : undefined
  }
}
