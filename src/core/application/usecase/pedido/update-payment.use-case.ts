import Pedido from '@/core/domain/entities/pedido'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

export default class UpdatePayment {
  constructor (
  private readonly gateway: PedidoGateway,
  ) {}

  async handle (id: number, paymentApproved: boolean): Promise<Pedido> {
    const pedido = await this.gateway.findById(id)
    if (!pedido) {
      throw new Error('Pedido não encontrado')
    }

    if (!paymentApproved) {
      return pedido
    }

    pedido.recebido()
    await this.gateway.save(pedido)
    return pedido
  }
}
