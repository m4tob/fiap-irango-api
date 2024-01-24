import { ApiProperty } from '@nestjs/swagger'

import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'

export default class CreateConsumidorRequest implements ConsumidorCreateDto {
  @ApiProperty({ description: 'Nome', example: 'Maine Coon' })
  readonly nome: string

  @ApiProperty({ description: 'CPF (apenas números)', example: '12345678900' })
  readonly cpf: string

  @ApiProperty({ description: 'Email', example: 'consumidor@irango.com' })
  readonly email: string
}
