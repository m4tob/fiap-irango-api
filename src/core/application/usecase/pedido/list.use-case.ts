import Pedido from '@/core/domain/entities/pedido'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'

export default class List {
  constructor (
  private readonly gateway: PedidoGateway,
  ) {}

  async handle (): Promise<Pedido[]> {
    const pedidos = await this.gateway.list()

    return pedidos
  }
}
