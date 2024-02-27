import { Injectable } from '@nestjs/common'

import { v4 as uuidv4 } from 'uuid'

import Pedido from '@/core/domain/entities/pedido'
import IPagamentoService from '@/core/domain/services/ipagamento.service'

@Injectable()
export default class MercadoPagoPagamentoService implements IPagamentoService {
  constructor (
  ) {}

  async registerOrder (pedido: Pedido): Promise<string> {
    console.log(`Mocked Mercado Pago API: Register order for pedido ${pedido.id}`)
    const gatewayPagamentoId = uuidv4() // mocked ID
    console.log(`Gateway Pagamento ID: ${gatewayPagamentoId}`)
    return gatewayPagamentoId
  }
}
