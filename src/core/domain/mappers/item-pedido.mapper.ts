import ItemPedidoDto from '@/core/domain/dto/output/item-pedido.dto'
import ItemPedido from '@/core/domain/entities/item-pedido'
import Produto from '@/core/domain/entities/produto'

export default class ItemPedidoMapper {
  static toDto (item: ItemPedido): ItemPedidoDto {
    return {
      ...item,
      ingredientesRemovidos: item.ingredientesRemovidos.map(ingrediente => ({
        id: ingrediente.id,
        nome: ingrediente.nome,
        produtoId: ingrediente.produtoId
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
