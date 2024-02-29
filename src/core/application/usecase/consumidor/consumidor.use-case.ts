import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import Consumidor from '@/core/domain/entities/consumidor'
import BusinessException from '@/core/domain/errors/business-exception'
import Cpf from '@/core/domain/value-object/Cpf'
import { ConsumidorGateway } from '@/core/operation/gateway/consumidor.gateway'

import IConsumidorUseCase from './iconsumidor.use-case'

export default class ConsumidorUseCase implements IConsumidorUseCase {
  constructor (
    private readonly gateway: ConsumidorGateway,
  ) {}

  async create (input: ConsumidorCreateDto): Promise<Consumidor> {
    const consumidor = Consumidor.create(
      input.nome,
      input.cpf,
      input.email,
    )
    const consumerExists = await this.gateway.findByCPF(consumidor.cpf)

    if (consumerExists) {
      throw new BusinessException('Consumidor já cadastrado com esse cpf')
    }

    await this.gateway.create(consumidor)
    return consumidor
  }

  async update (
    input: ConsumidorUpdateDto,
  ): Promise<Consumidor> {
    const consumidor = await this.gateway.findById(input.id)

    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    consumidor.update(input)

    await this.gateway.save(consumidor)

    return consumidor
  }

  async list (): Promise<Consumidor[]> {
    const consumidores = await this.gateway.find()

    return consumidores.map((consumidor) => consumidor)
  }

  async findById (id: string): Promise<Consumidor> {
    const consumidor = await this.gateway.findById(id)

    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    return consumidor
  }

  async findByCpf (cpf: Cpf): Promise<Consumidor> {
    const consumidor = await this.gateway.findByCPF(cpf)

    if (!consumidor) {
      throw new BusinessException('Consumidor não encontrado')
    }

    return consumidor
  }
}
