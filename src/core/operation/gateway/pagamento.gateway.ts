import Pedido from '@/core/domain/entities/pedido'
import IPagamentoService from '@/core/domain/services/ipagamento.service'

export class PagamentoGateway {
  constructor (private respository: IPagamentoService) {

  }

  async registerOrder (pedido: Pedido): Promise<string> {
    return this.respository.registerOrder(pedido)
  }
}
