import { ApiProperty } from '@nestjs/swagger'

import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import IngredienteResponse from '@/infra/web/nestjs/produtos/dto/ingrediente.response'

export default class CreateProdutoRequest implements ProdutoCreateDto {
  @ApiProperty({ description: 'Nome do Produto', example: 'Hamburguer de Picanha' })
  readonly nome: string

  @ApiProperty({ description: 'URL da Imagem do Produto', required: false, example: 'https://imagem/imagem.png' })
  readonly imagemUrl?: string

  @ApiProperty({ description: 'Descrição do Produto', example: 'Delicioso Hamburguer de Picanha' })
  readonly descricao: string

  @ApiProperty({ description: 'Preço do Produto', type: Number, example: 50.00 })
  readonly preco: number

  @ApiProperty({ description: 'Categoria', enum: ProdutoCategoriaEnum, example: ProdutoCategoriaEnum.LANCHE })
  readonly categoria: ProdutoCategoriaEnum

  @ApiProperty({
    description: 'Ingredientes do Produto',
    type: [IngredienteResponse],
    isArray: true,
    example: [{ nome: 'picanha' }, { nome: 'bacon' }, { nome: 'alface' }, { nome: 'tomate' }],
  })
  readonly ingredientes: IngredienteResponse[]
}
