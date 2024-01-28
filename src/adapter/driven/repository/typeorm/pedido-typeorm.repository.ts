import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Pedido as Entity } from '@/adapter/driven/entities/pedido'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
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
    const pedido = await this.repository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.consumidor', 'consumidor')
      .leftJoinAndSelect('pedido.itens', 'item')
      .leftJoinAndSelect('item.ingredientesRemovidos', 'ingredienteRemovido')
      .leftJoinAndSelect('item.produto', 'produto')
      .leftJoinAndSelect('produto.ingredientes', 'ingrediente')
      .where('pedido.id = :id', { id })
      .getOne()

    return pedido ? PedidoMapper.toDomainEntity(pedido) : undefined
  }

  async save (input: Pedido): Promise<Pedido> {
    const pedido = await this.findById(input.id)

    if (!pedido) {
      throw new Error('Pedido não existe')
    }

    const { itens, ...toSave } = input

    await this.repository.update(input.id, toSave as Entity)

    return pedido
  }

  async find (): Promise<Pedido[]> {
    const pedidos = await this.repository
      .createQueryBuilder('pedido')
      .leftJoinAndSelect('pedido.consumidor', 'consumidor')
      .leftJoinAndSelect('pedido.itens', 'item')
      .leftJoinAndSelect('item.ingredientesRemovidos', 'ingredienteRemovido')
      .leftJoinAndSelect('item.produto', 'produto')
      .leftJoinAndSelect('produto.ingredientes', 'ingrediente')
      .orderBy(`(
        CASE pedido.status
          WHEN '${PedidoStatusEnum.RECEBIDO}' THEN 1
          WHEN '${PedidoStatusEnum.PREPARACAO}' THEN 2
          WHEN '${PedidoStatusEnum.PRONTO}' THEN 3
          WHEN '${PedidoStatusEnum.RECEBIDO}' THEN 4
          ELSE 99
        END
      )`, 'ASC')
      .addOrderBy('pedido.createdAt', 'DESC')
      .getMany()

    return pedidos.map(PedidoMapper.toDomainEntity)
  }
}
