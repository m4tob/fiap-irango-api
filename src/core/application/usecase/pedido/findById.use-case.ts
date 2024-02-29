import Pedido from '@/core/domain/entities/pedido'
import BusinessException from '@/core/domain/errors/business-exception'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

export default class FindById {
  constructor (
  private readonly gateway: PedidoGateway,
  ) {}

  async handle (id: number): Promise<Pedido> {
    const pedido = await this.gateway.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    return pedido
  }
}
