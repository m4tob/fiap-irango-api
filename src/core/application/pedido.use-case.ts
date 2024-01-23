import { Inject } from '@nestjs/common'

import IPedidoUseCase from '@/core/application/ipedido.use-case'
import PedidoCreateDto, { ItemPedidoCreateDto } from '@/core/domain/dto/input/pedido-create.dto'
import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Ingrediente from '@/core/domain/entities/ingrediente'
import ItemPedido from '@/core/domain/entities/item-pedido'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IPedidoQueue, {
  IPedidoQueue as IPedidoQueueSymbol,
} from '@/core/domain/queues/ipedido.queue'
import IConsumidorRepository, {
  IConsumidorRepository as IConsumidorRepositorySymbol,
} from '@/core/domain/repositories/iconsumidor.repository'
import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IProdutoRepository, {
  IProdutoRepository as IProdutoRepositorySymbol,
} from '@/core/domain/repositories/iproduto.repository'

export default class PedidoUseCase implements IPedidoUseCase {
  constructor (
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IConsumidorRepositorySymbol) private readonly consumidorRepository: IConsumidorRepository,
    @Inject(IProdutoRepositorySymbol) private readonly produtoRepository: IProdutoRepository,
    @Inject(IPedidoQueueSymbol) private readonly pedidoQueue: IPedidoQueue,
  ) {}

  async list (): Promise<PedidoDto[]> {
    const pedidos = await this.repository.find()

    return pedidos.map((pedido) => PedidoMapper.toDto(pedido))
  }

  async create (input: PedidoCreateDto): Promise<PedidoDto> {
    let consumidor
    if (input.consumidorId) {
      consumidor = await this.consumidorRepository.findById(input.consumidorId)
    }
    const itens = await this.buildItens(input.itens)

    const total = itens.reduce((acc, item) => {
      return acc + item.preco
    }, 0)

    let pedido = Pedido.create(
      consumidor,
      itens,
      total,
      PedidoStatusEnum.RECEBIDO,
    )
    itens.forEach((item) => {
      item.pedido = pedido
    })

    pedido = await this.repository.create(pedido)

    await this.pedidoQueue.add(pedido)

    return PedidoMapper.toDto(pedido)
  }

  private async buildItens (itens: ItemPedidoCreateDto[]): Promise<ItemPedido[]> {
    const itensPromise = itens.map(async (item) => {
      const produto = await this.produtoRepository.findById(item.produtoId)
      if (!produto) {
        throw new Error('Produto não encontrado')
      }
      const ingredientes = item.ingredientesRemovidos.filter((ingredienteId) => produto.ingredientes.some((ingrediente) => ingrediente.id === ingredienteId))
      const ingredientesRemovidos = ingredientes.map((ingredienteId) => new Ingrediente({ id: ingredienteId }))

      return {
        produto,
        produtoId: produto.id,
        preco: produto.preco,
        ingredientesRemovidos,
      }
    })

    return Promise.all(itensPromise)
  }

  async update (id: number, input: PedidoUpdateDto): Promise<PedidoDto> {
    const pedido = await this.repository.findById(id)

    if (!pedido) {
      throw new Error('Pedido não encontrado')
    }

    pedido.update(input)

    await this.repository.save(pedido)

    return PedidoMapper.toDto(pedido)
  }
}