import { ApiProperty } from '@nestjs/swagger'

import { IngredienteDto } from '@/core/domain/dto/input/produto-create.dto'

export default class IngredienteProdutoResponse implements IngredienteDto {
  @ApiProperty({
    example: 'Alface',
    description: 'Nome do Ingrediente',
    type: String,
  })
  readonly nome: string

  @ApiProperty({
    example: '10.20',
    description: 'Preço do Produto',
    type: Number,
  })
  readonly preco?: number

   @ApiProperty({
     example: 'https://imagem/imagem.png',
     description: '',
     type: String,
   })
   readonly imagemUrl?: string
}
