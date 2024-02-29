import Pedido from '@/core/domain/entities/pedido'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'

export class PedidoGateway {
  constructor (
    private readonly repository: IPedidoRepository
    ) {
  }

  list () {
    return this.repository.find()
  }

  create (pedido: Pedido): Promise<Pedido> {
    return this.repository.create(pedido)
  }

  save (pedido: Pedido): Promise<Pedido> {
    return this.repository.save(pedido)
  }

  findById (id: number): Promise<Pedido | undefined> {
    return this.repository.findById(id)
  }
}
