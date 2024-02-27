import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IPedidoUseCase } from '@/core/application/usecase/pedido/ipedido.use-case'
import PedidoUseCase from '@/core/application/usecase/pedido/pedido.use-case'
import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'
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
    { provide: IPedidoUseCase, useClass: PedidoUseCase },
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
  ],
  controllers: [
    PedidosController
  ],
})
export default class PedidosModule {}
