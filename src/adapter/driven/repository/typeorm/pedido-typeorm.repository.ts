import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Pedido as Entity } from '@/adapter/driven/entities/pedido'
import Pedido from '@/core/domain/entities/pedido'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'

@Injectable()
export default class PedidoTypeormRepository implements IPedidoRepository {
  constructor (
    @InjectRepository(Entity) private readonly repository: Repository<Entity>
  ) {}

  async create (input: Pedido): Promise<Pedido> {
    const model = PedidoMapper.toDto(input)
    await this.repository.insert(model)
    return PedidoMapper.toDomainEntity(model)
  }

  async findById (id: number): Promise<Pedido | undefined> {
    const pedido = await this.repository.findOneBy({
      id
    })

    return pedido ? PedidoMapper.toDomainEntity(pedido) : undefined
  }

  async save (input: Pedido): Promise<Pedido> {
    const pedido = await this.findById(input.id)

    if (!pedido) {
      throw new Error('Pedido não existe')
    }

    await this.repository.update(input.id, PedidoMapper.toDto(input))

    return pedido
  }

  async find (): Promise<Pedido[]> {
    const pedidos = await this.repository.find()

    return pedidos.map(PedidoMapper.toDomainEntity)
  }
}
