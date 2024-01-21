import { ApiProperty } from '@nestjs/swagger'

import IngredienteProdutoResponse from '@/adapter/driver/nestjs/produtos/dto/ingrediente-produto.response'
import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default class CreateProdutoDto implements ProdutoCreateDto {
  @ApiProperty({
    example: 'X -bacon',
    description: 'Nome do Produto',
    type: String,
  })
  readonly nome: string

  @ApiProperty({
    example: 'Tem  bacon',
    description: 'Descrição do Produto',
    type: String,
  })
  readonly descricao: string

  @ApiProperty({
    example: '10.20',
    description: 'Preço do Produto',
    type: Number,
  })
  readonly preco: number

  @ApiProperty({
    example: ProdutoCategoriaEnum.ACOMPANHAMENTO,
    description: 'Categoria',
    enum: ProdutoCategoriaEnum,
  })
  readonly categoria: ProdutoCategoriaEnum

  @ApiProperty({
    example: 'https://localhost.com/alface.jpg',
    description: 'url da imagem',
    type: String,
  })
  readonly imagemUrl: string

  @ApiProperty({
    example: [{ nome: 'bacon' }],
    description: 'Preço do Produto',
    type: Array<IngredienteProdutoResponse>,
    isArray: true
  })
  readonly ingredientes: []
}
