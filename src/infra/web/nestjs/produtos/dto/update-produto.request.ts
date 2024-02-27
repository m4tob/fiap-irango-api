import { ApiProperty } from '@nestjs/swagger'

import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import IngredienteRequest from '@/infra/web/nestjs/produtos/dto/ingrediente.request'

export default class UpdateProdutoRequest implements ProdutoUpdateDto {
  @ApiProperty({ description: 'ID no formato uuid', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly id: string

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
    type: [IngredienteRequest],
    isArray: true,
    example: [{ nome: 'picanha' }, { nome: 'bacon' }, { nome: 'alface' }, { nome: 'tomate' }],
  })
  readonly ingredientes: IngredienteRequest[]
}
