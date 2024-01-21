import { ApiProperty } from '@nestjs/swagger'

import ConsumidorResponse from '@/adapter/driver/nestjs/consumidores/dto/consumidor.response'
import ItemPedidoResponse from '@/adapter/driver/nestjs/pedido/dto/item-pedido.response'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default class PedidoResponse implements PedidoDto {
  @ApiProperty({
    example: 1,
    description: 'ID',
    type: String,
    required: false,
  })
  readonly id?: number

  @ApiProperty({
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805',
    description: 'ID do Consumidor',
    type: String,
    required: false,
  })
  readonly consumidorId?: string

  @ApiProperty({
    description: 'Consumidor',
    type: ConsumidorResponse,
    required: false,
  })
  readonly consumidor?: ConsumidorResponse

  @ApiProperty({
    example: 50.00,
    description: 'Total do pedido',
    type: Number,
  })
  readonly total: number

  @ApiProperty({
    description: 'Ingredientes removidos',
    type: [ItemPedidoResponse],
  })
  readonly itens: ItemPedidoResponse[]

  @ApiProperty({
    example: [PedidoStatusEnum.RECEBIDO],
    description: 'Status',
    enum: PedidoStatusEnum,
  })
  readonly status: PedidoStatusEnum

  @ApiProperty({
    example: new Date(),
    description: 'Data de criação',
    type: Date,
  })
  readonly createdAt: Date

  @ApiProperty({
    example: new Date(),
    description: 'Data de atualização',
    type: Date,
  })
  readonly updatedAt: Date
}
