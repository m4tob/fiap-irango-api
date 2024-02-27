import { ApiProperty } from '@nestjs/swagger'

import ProdutoDto from '@/core/domain/dto/output/produto.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import IngredienteResponse from '@/infra/web/nestjs/produtos/dto/ingrediente.response'

export default class ProdutoResponse implements ProdutoDto {
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
    type: [IngredienteResponse],
    isArray: true,
    example: [{ nome: 'picanha' }, { nome: 'bacon' }, { nome: 'alface' }, { nome: 'tomate' }],
  })
  readonly ingredientes: IngredienteResponse[]

  @ApiProperty({ description: 'Data de exclusão', type: Date, required: false, example: new Date() })
  readonly deletedAt?: Date
}
