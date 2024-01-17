import { Injectable } from '@nestjs/common'

import Pedido from '@/core/domain/entities/pedido'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'

@Injectable()
export default class PedidoMemoryRepository implements IPedidoRepository {
  private pedidos: Pedido[] = []

  async find (): Promise<Pedido[]> {
    return this.pedidos
  }

  findById (id: number): Promise<Pedido | undefined> {
    return Promise.resolve(this.pedidos.find((pedido) => pedido.id === id))
  }

  async create (input: Pedido): Promise<Pedido> {
    this.pedidos.push(input)
    return input
  }

  async save (input: Pedido): Promise<Pedido> {
    const index = this.pedidos.findIndex((pedido) => pedido.id === input.id)

    if (index !== -1) {
      this.pedidos.splice(index, 1)
    }

    return this.create(input)
  }
}
