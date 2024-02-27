import { Injectable } from '@nestjs/common'

import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'

@Injectable()
export default class PedidoMemoryRepository implements IPedidoRepository {
  private pedidos: Pedido[] = []

  async find (): Promise<Pedido[]> {
    return this.pedidos
      .filter(p => p.status !== PedidoStatusEnum.FINALIZADO)
      .sort((a, b) => {
        const statusOrder = [PedidoStatusEnum.PRONTO, PedidoStatusEnum.PREPARACAO, PedidoStatusEnum.RECEBIDO]
        const statusResult = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)

        if (statusResult !== 0) return statusResult

        if (a.createdAt && b.createdAt) return a.createdAt.getTime() - b.createdAt.getTime()

        return 0
      })
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
