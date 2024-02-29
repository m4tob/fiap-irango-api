import ConsumidorUseCase from '@/core/application/usecase/consumidor/consumidor.use-case'
import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import ConsumidorDto from '@/core/domain/dto/output/consumidor.dto'
import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'
import IConsumidorRepository from '@/core/domain/repositories/iconsumidor.repository'
import Cpf from '@/core/domain/value-object/Cpf'
import { ConsumidorGateway } from '@/core/operation/gateway/consumidor.gateway'

export class ConsumidorController {
  constructor (
   private readonly consumidorRepository: IConsumidorRepository,
  ) {}

  async create (
    input: ConsumidorCreateDto
  ): Promise<ConsumidorDto> {
    const useCase = new ConsumidorUseCase(
      new ConsumidorGateway(this.consumidorRepository),
    )

    const pedido = await useCase.create(input)

    return ConsumidorMapper.toDto(pedido)
  }

  async update (
    input: ConsumidorUpdateDto
  ): Promise<ConsumidorDto> {
    const useCase = new ConsumidorUseCase(new ConsumidorGateway(this.consumidorRepository))

    const pedido = await useCase.update(input)
    return ConsumidorMapper.toDto(pedido)
  }

  async list (): Promise<ConsumidorDto[]> {
    const useCase = new ConsumidorUseCase(new ConsumidorGateway(this.consumidorRepository))

    const consumidor = await useCase.list()
    return consumidor.map((pedido) => ConsumidorMapper.toDto(pedido))
  }

  async findById (
     id: string,
  ): Promise<ConsumidorDto> {
    const useCase = new ConsumidorUseCase(new ConsumidorGateway(this.consumidorRepository))

    const consumidor = await useCase.findById(id)

    return ConsumidorMapper.toDto(consumidor)
  }

  async findByCpf (
    cpf: string,
 ): Promise<ConsumidorDto> {
    const useCase = new ConsumidorUseCase(new ConsumidorGateway(this.consumidorRepository))
    const validateCpf = false
    const cpfValidated = new Cpf(cpf, validateCpf)
    const consumidor = await useCase.findByCpf(cpfValidated)

    return ConsumidorMapper.toDto(consumidor)
  }
}
