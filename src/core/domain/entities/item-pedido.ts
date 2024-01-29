import { v4 as uuidv4 } from 'uuid'

import ItemPedidoDto from '@/core/domain/dto/output/item-pedido.dto'
import Ingrediente from '@/core/domain/entities/ingrediente'
import Pedido from '@/core/domain/entities/pedido'
import Produto from '@/core/domain/entities/produto'

export default class ItemPedido implements ItemPedidoDto {
  readonly id?: string
  produtoId: string
  produto: Produto
  pedidoId?: number
  pedido?: Pedido
  preco: number
  ingredientesRemovidos: Ingrediente[]

  constructor (params?: Partial<ItemPedido>) {
    Object.assign(this, params)
  }

  static create (
    produto: Produto,
    ingredientesRemovidos: Ingrediente[]
  ): ItemPedido {
    const id = uuidv4()
    return new ItemPedido({
      id,
      produto,
      produtoId: produto.id,
      preco: produto.preco,
      ingredientesRemovidos
    })
  }
}
