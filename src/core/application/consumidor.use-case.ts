import { Inject } from '@nestjs/common'

import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import ConsumidorDto from '@/core/domain/dto/output/consumidor.dto'
import Consumidor from '@/core/domain/entities/consumidor'
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

    await this.repository.create(consumidor)
    return ConsumidorMapper.toConsumidorDto(consumidor)
  }

  async update (
    input: ConsumidorUpdateDto,
  ): Promise<ConsumidorDto | undefined> {
    const consumidor = await this.repository.findById(input.id)

    if (!consumidor) {
      return undefined
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

  async findByCpf (cpf: Cpf): Promise<ConsumidorDto| undefined> {
    const consumidor = await this.repository.findByCPF(cpf)

    if (!consumidor) {
      return undefined
    }

    return ConsumidorMapper.toConsumidorDto(consumidor)
  }
}
