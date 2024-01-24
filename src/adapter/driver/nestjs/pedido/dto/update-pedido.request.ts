import { ApiProperty } from '@nestjs/swagger'

import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default class UpdatePedidoRequest implements PedidoUpdateDto {
  @ApiProperty({ description: 'Novo status do Pedido', enum: PedidoStatusEnum, example: PedidoStatusEnum.RECEBIDO })
  readonly status: PedidoStatusEnum
}
