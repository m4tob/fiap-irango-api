import { Inject } from '@nestjs/common'

import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import ConsumidorDto from '@/core/domain/dto/output/consumidor.dto'
import Consumidor from '@/core/domain/entities/consumidor'
import { BusinessException } from '@/core/domain/errors/business-exception'
import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'
import IConsumidorRepository, {
  IConsumidorRepository as IConsumidorRepositorySymbol,
} from '@/core/domain/repositories/iconsumidor.repository'
import Cpf from '@/core/domain/value-object/Cpf'

import IConsumidorUseCase from './iconsumidor.use-case'

export default class ConsumidorUseCase implements IConsumidorUseCase {
  constructor (
    @Inject(IConsumidorRepositorySymbol)
    private readonly repository: IConsumidorRepository,
  ) {}

  async create (input: ConsumidorCreateDto): Promise<ConsumidorDto> {
    const consumidor = Consumidor.create(
      input.nome,
      input.cpf,
      input.email,
    )
    const consumerExists = await this.repository.findByCPF(consumidor.cpf)

    if (consumerExists) {
      throw new BusinessException('Consumidor já cadastrado com esse cpf')
    }

    await this.repository.create(consumidor)
    return ConsumidorMapper.toConsumidorDto(consumidor)
  }

  async update (
    input: ConsumidorUpdateDto,
  ): Promise<ConsumidorDto | undefined> {
    const consumidor = await this.repository.findById(input.id)

    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    consumidor.update(input)

    await this.repository.save(consumidor)

    return ConsumidorMapper.toConsumidorDto(consumidor)
  }

  async list (): Promise<ConsumidorDto[]> {
    const consumidores = await this.repository.find()

    return consumidores.map((consumidor) => {
      return ConsumidorMapper.toConsumidorDto(consumidor)
    })
  }

  async findById (id: string): Promise<ConsumidorDto| undefined> {
    const consumidor = await this.repository.findById(id)

    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    return ConsumidorMapper.toConsumidorDto(consumidor)
  }

  async findByCpf (cpf: Cpf): Promise<ConsumidorDto| undefined> {
    const consumidor = await this.repository.findByCPF(cpf)

    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    return ConsumidorMapper.toConsumidorDto(consumidor)
  }
}
