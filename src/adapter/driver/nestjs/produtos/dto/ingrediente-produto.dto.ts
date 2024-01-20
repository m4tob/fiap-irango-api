import { ApiProperty } from '@nestjs/swagger'

import { IngredienteDto } from 'src/core/domain/dto/input/produto-create.dto'

export default class IngredienteProdutoDto implements IngredienteDto {
  @ApiProperty({
    example: 'Alface',
    description: 'Nome do Ingrediente',
    type: String,
  })
  readonly nome: string
}
