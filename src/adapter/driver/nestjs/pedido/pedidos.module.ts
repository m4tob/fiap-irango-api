import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Pedido } from '@/adapter/driven/entities/pedido'
import PedidoRedisQueue from '@/adapter/driven/queues/pedido-redis.queue'
import PedidoTypeormRepository from '@/adapter/driven/repository/typeorm/pedido-typeorm.repository'
import { PedidosController } from '@/adapter/driver/nestjs/pedido/pedidos.controller'
import { BullQueueConfig } from '@/config/BullConfig'
import { IPedidoUseCase } from '@/core/application/ipedido.use-case'
import PedidoUseCase from '@/core/application/pedido.use-case'
import { IPedidoQueue } from '@/core/domain/queues/ipedido.queue'
import { IPedidoRepository } from '@/core/domain/repositories/ipedido.repository'

const PEDIDOS_BULL_QUEUE = 'pedidos'

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido]),
    BullModule.registerQueue(BullQueueConfig({ name: PEDIDOS_BULL_QUEUE })),
  ],
  providers: [
    { provide: IPedidoUseCase, useClass: PedidoUseCase },
    { provide: IPedidoRepository, useClass: PedidoTypeormRepository },
    { provide: IPedidoQueue, useClass: PedidoRedisQueue },
  ],
  controllers: [
    PedidosController
  ],
})
export class PedidosModule {}

export const PEDIDOS_QUEUE = PEDIDOS_BULL_QUEUE
