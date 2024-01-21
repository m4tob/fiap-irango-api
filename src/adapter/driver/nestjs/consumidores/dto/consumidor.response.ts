import { ApiProperty } from '@nestjs/swagger'

import ConsumidorDto from '@/core/domain/dto/output/consumidor.dto'

export default class ConsumidorResponse implements ConsumidorDto {
  @ApiProperty({
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805',
    description: 'ID',
    type: String,
  })
  readonly id: string

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
