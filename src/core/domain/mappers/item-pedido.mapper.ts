import Produto from '@/core/domain/entities/produto'

import ItemPedidoDto from '../dto/output/item-pedido.dto'
import ItemPedido from '../entities/item-pedido'

export default class ItemPedidoMapper {
  static toDto (item: ItemPedido): ItemPedidoDto {
    return {
      ...item,
      ingredientesRemovidos: item.ingredientesRemovidos.map(ingrediente => ({
        id: ingrediente.id,
        nome: ingrediente.nome,
      }))
    }
  }

  static toDomainEntity (input: ItemPedidoDto): ItemPedido {
    return new ItemPedido({
      id: input.id,
      preco: input.preco,
      produto: new Produto(input.produto),
      ingredientesRemovidos: input.ingredientesRemovidos
    })
  }
}
