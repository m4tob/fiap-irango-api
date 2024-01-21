import Pedido from '@/core/domain/entities/pedido'

export default interface IPedidoQueue {
  add(input: Pedido): Promise<void>;
}

export const IPedidoQueue = Symbol('IPedidoQueue')
