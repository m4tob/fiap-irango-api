import { ApiProperty } from '@nestjs/swagger'

import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default class UpdatePedidoDto implements PedidoUpdateDto {
  @ApiProperty({
    example: PedidoStatusEnum.RECEBIDO,
    description: 'Status',
    enum: PedidoStatusEnum,
  })
  readonly status: PedidoStatusEnum
}
