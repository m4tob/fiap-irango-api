import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ItemPedido } from '@/adapter/driven/entities/item-pedido'
import { Pedido } from '@/adapter/driven/entities/pedido'
import PedidoTypeormRepository from '@/adapter/driven/repository/typeorm/pedido-typeorm.repository'
import PedidosController from '@/adapter/driver/nestjs/pedido/pedidos.controller'
import { IPedidoUseCase } from '@/core/application/ipedido.use-case'
import PedidoUseCase from '@/core/application/pedido.use-case'
import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      ItemPedido,
    ]),
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
