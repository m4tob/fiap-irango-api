import { ApiProperty } from '@nestjs/swagger'

import IngredienteDto from '@/core/domain/dto/output/ingrediente.dto'

export default class IngredienteResponse implements IngredienteDto {
  @ApiProperty({ description: 'ID no formato uuid', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly id?: string

  @ApiProperty({ description: 'Nome do Ingrediente', example: 'picanha' })
  readonly nome: string

  @ApiProperty({ description: 'URL da Imagem do Ingrediente', required: false, example: 'https://imagem/imagem.png' })
  readonly imagemUrl?: string

  @ApiProperty({ description: 'Preço do Ingrediente', type: Number, required: false, example: 50.00 })
  readonly preco?: number

  @ApiProperty({ description: 'ID do Produto no formato uuid', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly produtoId?: string
}
