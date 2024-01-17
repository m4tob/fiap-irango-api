import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'
import ItemPedidoMapper from '@/core/domain/mappers/item-pedido.mapper'

import PedidoDto from '../dto/output/pedido.dto'
import Pedido from '../entities/pedido'

export default class PedidoMapper {
  static toDto (pedido: Pedido): PedidoDto {
    const consumidor = pedido.consumidor ? ConsumidorMapper.toConsumidorDto(pedido.consumidor) : undefined
    return {
      id: pedido.id,
      consumidor,
      itens: pedido.itens.map(item => ItemPedidoMapper.toDto(item)),
      total: pedido.total,
      status: pedido.status,
      createdAt: pedido.createdAt,
      updatedAt: pedido.updatedAt
    }
  }

  static toDomainEntity (input: PedidoDto): Pedido {
    const consumidor = input.consumidor ? ConsumidorMapper.toDtoForConsumidor(input.consumidor) : undefined
    return new Pedido({
      id: input.id,
      consumidor,
      itens: input.itens.map(item => ItemPedidoMapper.toDomainEntity(item)),
      total: input.total,
      status: input.status,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt
    })
  }
}
