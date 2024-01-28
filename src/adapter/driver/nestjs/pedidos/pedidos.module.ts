import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ItemPedido } from '@/adapter/driven/entities/item-pedido'
import { Pedido } from '@/adapter/driven/entities/pedido'
import PedidoTypeormRepository from '@/adapter/driven/repository/typeorm/pedido-typeorm.repository'
import ConsumidoresModule from '@/adapter/driver/nestjs/consumidores/consumidores.module'
import PedidosController from '@/adapter/driver/nestjs/pedidos/pedidos.controller'
import ProdutosModule from '@/adapter/driver/nestjs/produtos/produtos.module'
import { IPedidoUseCase } from '@/core/application/ipedido.use-case'
import PedidoUseCase from '@/core/application/pedido.use-case'
import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'

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
