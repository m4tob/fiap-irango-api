import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
import { IPagamentoService } from '@/core/domain/services/ipagamento.service'
import MercadoPagoPagamentoService from '@/infra/persistence/service/mercado-pago-payment.service'
import { ItemPedido } from '@/infra/persistence/typeorm/entities/item-pedido'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import PedidoTypeormRepository from '@/infra/persistence/typeorm/repository/pedido-typeorm.repository'
import ConsumidoresModule from '@/infra/web/nestjs/consumidores/consumidores.module'
import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'
import ProdutosModule from '@/infra/web/nestjs/produtos/produtos.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      ItemPedido,
    ]),

    ProdutosModule,
    ConsumidoresModule,
  ],
  providers: [
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
    { provide: IPagamentoService, useClass: MercadoPagoPagamentoService },

  ],
  controllers: [
    PedidosController
  ],
})
export default class PedidosModule {}
