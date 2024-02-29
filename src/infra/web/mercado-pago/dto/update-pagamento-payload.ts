import { ApiProperty } from '@nestjs/swagger'

export default class UpdatePagamentoPayload {
  @ApiProperty({ description: 'ID do Pedido no gateway de pagamento', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly id: string

  @ApiProperty({ description: 'ID do Pedido', example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  readonly external_reference: string

  @ApiProperty({
    description: 'Data de aprovação do pagamento',
    example: new Date().toISOString(),
    required: false
  })
  readonly date_approved?: string
}
