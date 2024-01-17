import { ApiProperty } from '@nestjs/swagger'

import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'

export default class CreateConsumidorDto implements ConsumidorCreateDto {
  @ApiProperty({
    example: 'Maine Coon',
    description: 'Nome do Consumidor',
    type: String,
  })
  readonly nome: string

  @ApiProperty({
    example: '28855124072',
    description: 'Cpf',
    type: String,
  })
  readonly cpf: string

  @ApiProperty({
    example: 'test@test.com',
    description: 'Email',
    type: String,
  })
  readonly email: string
}
