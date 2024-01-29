import ItemPedidoDto from '@/core/domain/dto/output/item-pedido.dto'
import ItemPedido from '@/core/domain/entities/item-pedido'
import Produto from '@/core/domain/entities/produto'
import ProdutoMapper from '@/core/domain/mappers/produto.mapper'

export default class ItemPedidoMapper {
  static toDto (item: ItemPedido): ItemPedidoDto {
    return {
      ...item,
      produtoId: item.produto.id,
      produto: ProdutoMapper.toDto(item.produto),
      pedidoId: item.pedido?.id,
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      ingredientesRemovidos: item.ingredientesRemovidos?.map(ingrediente => ({
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
