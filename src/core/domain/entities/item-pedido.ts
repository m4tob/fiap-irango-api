import ItemPedidoDto from '@/core/domain/dto/output/item-pedido.dto'
import Ingrediente from '@/core/domain/entities/ingrediente'
import Pedido from '@/core/domain/entities/pedido'
import Produto from '@/core/domain/entities/produto'

export default class ItemPedido implements ItemPedidoDto {
  readonly id?: string
  produtoId: string
  produto: Produto
  pedido?: Pedido
  preco: number
  ingredientesRemovidos: Ingrediente[]

  constructor (params?: Partial<ItemPedido>) {
    Object.assign(this, params)
  }
}
