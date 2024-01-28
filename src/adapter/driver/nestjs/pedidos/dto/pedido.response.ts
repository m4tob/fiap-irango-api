import { ApiProperty } from '@nestjs/swagger'

import ConsumidorResponse from '@/adapter/driver/nestjs/consumidores/dto/consumidor.response'
import ItemPedidoResponse from '@/adapter/driver/nestjs/pedidos/dto/item-pedido.response'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default class PedidoResponse implements PedidoDto {
  @ApiProperty({ description: 'ID', type: String, required: false, example: 12345 })
  readonly id?: number

  @ApiProperty({
    description: 'ID do Consumidor no formato uuid',
    required: false,
    example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805'
  })
  readonly consumidorId?: string

  @ApiProperty({ description: 'Consumidor', type: ConsumidorResponse, required: false })
  readonly consumidor?: ConsumidorResponse

  @ApiProperty({ description: 'Total do Pedido', type: Number, example: 50.00 })
  readonly total: number

  @ApiProperty({ description: 'Itens do Pedido', type: [ItemPedidoResponse], isArray: true })
  readonly itens: ItemPedidoResponse[]

  @ApiProperty({ description: 'Status atual do Pedido', enum: PedidoStatusEnum, example: PedidoStatusEnum.RECEBIDO })
  readonly status: PedidoStatusEnum

  @ApiProperty({ description: 'Data de criação do Pedido', type: Date, example: new Date() })
  readonly createdAt?: Date

  @ApiProperty({ description: 'Data da última atualização do Pedido', type: Date, example: new Date() })
  readonly updatedAt?: Date
}
