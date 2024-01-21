import { ApiProperty } from '@nestjs/swagger'

import IngredienteDto from '@/core/domain/dto/output/ingrediente.dto'

export default class IngredienteResponse implements IngredienteDto {
  @ApiProperty({
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805',
    description: 'ID',
    type: String,
  })
  readonly id: string

  @ApiProperty({
    example: 'Picles',
    description: 'Nome do Ingrediente',
    type: String,
  })
  readonly nome: string
}
