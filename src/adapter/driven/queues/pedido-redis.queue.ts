import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'

import { Queue } from 'bull'

import { PEDIDOS_QUEUE } from '@/adapter/driver/nestjs/pedido/pedidos.module'
import PedidosQueueMessage from '@/adapter/driver/nestjs/pedido/pedidos.queue-messsage'
import Pedido from '@/core/domain/entities/pedido'
import IPedidoQueue from '@/core/domain/queues/ipedido.queue'

@Injectable()
export default class PedidoRedisQueue implements IPedidoQueue {
  constructor (
    @InjectQueue(PEDIDOS_QUEUE) private readonly pedidosQueue: Queue<PedidosQueueMessage>
  ) {}

  async add (input: Pedido): Promise<void> {
    await this.pedidosQueue.add(input)
  }
}
