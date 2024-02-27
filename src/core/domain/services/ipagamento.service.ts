import Pedido from '@/core/domain/entities/pedido'

export default interface IPagamentoService {
  registerOrder(pedido: Pedido): Promise<string>;
}

export const IPagamentoService = Symbol('IPagamentoService')
