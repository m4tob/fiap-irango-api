import { ApiProperty } from '@nestjs/swagger'

import ProdutoCreateDto from 'src/core/domain/dto/input/produto-create.dto'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default class CreateProdutoDto implements ProdutoCreateDto {
  @ApiProperty({
    example: 'Maine Coon',
    description: 'Nome do Produto',
    type: String,
  })
  readonly nome: string

  @ApiProperty({
    example: 'Maine Coon',
    description: 'Descrição do Produto',
    type: String,
  })
  readonly description: string

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
  readonly categoriaId: ProdutoCategoriaEnum
}
