import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Pedido from '@/core/domain/entities/pedido'
import ConsumidorMapper from '@/core/domain/mappers/consumidor.mapper'
import ItemPedidoMapper from '@/core/domain/mappers/item-pedido.mapper'

export default class PedidoMapper {
  static toDto (pedido: Pedido): PedidoDto {
    const consumidor = pedido.consumidor ? ConsumidorMapper.toDto(pedido.consumidor) : undefined
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
    const consumidor = input.consumidor ? ConsumidorMapper.toDomainEntity(input.consumidor) : undefined
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
