import { ApiProperty } from '@nestjs/swagger'

import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'

export default class UpdateConsumidorRequest implements ConsumidorUpdateDto {
  @ApiProperty({ description: 'ID no formato uuid', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly id: string

  @ApiProperty({ description: 'Nome', example: 'Maine Coon' })
  readonly nome: string

  @ApiProperty({ description: 'CPF (apenas números)', example: '12345678900' })
  readonly cpf: string

  @ApiProperty({ description: 'Email', example: 'consumidor@irango.com' })
  readonly email: string
}
