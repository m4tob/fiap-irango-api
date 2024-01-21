import { ApiProperty } from '@nestjs/swagger'

import IngredienteResponse from '@/adapter/driver/nestjs/produtos/dto/ingrediente.response'
import ProdutoResponse from '@/adapter/driver/nestjs/produtos/dto/produto.response'
import ItemPedidoDto from '@/core/domain/dto/output/item-pedido.dto'

export default class ItemPedidoResponse implements ItemPedidoDto {
  @ApiProperty({
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805',
    description: 'ID do Produto',
    type: String,
  })
  readonly produtoId: string

  @ApiProperty({
    description: 'Produto',
    type: ProdutoResponse,
  })
  readonly produto: ProdutoResponse

  @ApiProperty({
    example: 50.00,
    description: 'Preço do item',
    type: Number,
  })
  readonly preco: number

  @ApiProperty({
    example: ['29d17f4f-1197-4fc4-9b30-e86729644361', 'fca63f61-a18d-4a2c-90a7-070567e2c948'],
    description: 'Ingredientes removidos',
    type: [IngredienteResponse],
  })
  readonly ingredientesRemovidos: IngredienteResponse[]
}
