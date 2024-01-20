import { ApiProperty } from '@nestjs/swagger'

import ProdutoDto from 'src/core/domain/dto/output/produto.dto'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import IngredienteProdutoDto from '@/adapter/driver/nestjs/produtos/dto/ingrediente-produto.dto'

export default class Produto implements ProdutoDto {

  @ApiProperty({
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805',
    description: 'ID',
    type: String,
  })
  readonly id: string

  @ApiProperty({
    example: 'X-Burger',
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
    example: new Date(),
    description: 'Data de remoção',
    type: Date,
  })
  readonly deletedAt: Date | null

   @ApiProperty({
      example: 'https://imagem/imagem.png',
      description: '',
      type: String,
   })
   readonly imagemUrl: string | null


  @ApiProperty({
    example: [{"nome":'bacon'}],
    description: 'ingredientes',
    type: Array<IngredienteProdutoDto>,
    isArray: true
  })
 readonly  ingredientes:[]




}
