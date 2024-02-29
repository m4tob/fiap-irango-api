import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto'
import Pedido from '@/core/domain/entities/pedido'
import BusinessException from '@/core/domain/errors/business-exception'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

export default class Update {
  constructor (
  private readonly gateway: PedidoGateway,
  ) {}

  async handle (id: number, input: PedidoUpdateDto): Promise<Pedido> {
    const pedido = await this.gateway.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    pedido.update(input)

    await this.gateway.save(pedido)

    return pedido
  }
}
