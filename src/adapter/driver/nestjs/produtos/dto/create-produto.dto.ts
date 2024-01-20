import { ApiProperty } from '@nestjs/swagger'

import ProdutoCreateDto from 'src/core/domain/dto/input/produto-create.dto'

import IngredienteProdutoDto from '@/adapter/driver/nestjs/produtos/dto/ingrediente-produto.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default class CreateProdutoDto implements ProdutoCreateDto {
  @ApiProperty({
    example: 'X -bacon',
    description: 'Nome do Produto',
    type: String,
  })
  readonly nome: string

  @ApiProperty({
    example: 'Maine Coon',
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
    example: [{"nome":'bacon'}],
    description: 'Preço do Produto',
    type: Array<IngredienteProdutoDto>,
    isArray: true
  })
  readonly ingredientes: []
}
