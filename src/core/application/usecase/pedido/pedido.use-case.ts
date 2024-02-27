import { Inject, Injectable } from '@nestjs/common'

import IPedidoUseCase from '@/core/application/usecase/pedido/ipedido.use-case'
import PedidoCreateDto, { ItemPedidoCreateDto } from '@/core/domain/dto/input/pedido-create.dto'
import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import Ingrediente from '@/core/domain/entities/ingrediente'
import ItemPedido from '@/core/domain/entities/item-pedido'
import Pedido from '@/core/domain/entities/pedido'
import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IConsumidorRepository, {
  IConsumidorRepository as IConsumidorRepositorySymbol,
} from '@/core/domain/repositories/iconsumidor.repository'
import IPedidoRepository, {
  IPedidoRepository as IPedidoRepositorySymbol,
} from '@/core/domain/repositories/ipedido.repository'
import IProdutoRepository, {
  IProdutoRepository as IProdutoRepositorySymbol,
} from '@/core/domain/repositories/iproduto.repository'
import IPagamentoService, {
  IPagamentoService as IPagamentoServiceSymbol,
} from '@/core/domain/services/ipagamento.service'

@Injectable()
export default class PedidoUseCase implements IPedidoUseCase {
  constructor (
    @Inject(IPedidoRepositorySymbol) private readonly repository: IPedidoRepository,
    @Inject(IConsumidorRepositorySymbol) private readonly consumidorRepository: IConsumidorRepository,
    @Inject(IProdutoRepositorySymbol) private readonly produtoRepository: IProdutoRepository,
    @Inject(IPagamentoServiceSymbol) private readonly pagamentoService: IPagamentoService,
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

    let pedido = Pedido.create(
      consumidor,
      itens,
      PedidoStatusEnum.PAGAMENTO_PENDENTE,
    )

    pedido = await this.repository.create(pedido)

    const gatewayPagamentoId = await this.pagamentoService.registerOrder(pedido)
    console.log(gatewayPagamentoId)
    pedido.gatewayPagamentoId = gatewayPagamentoId

    pedido = await this.repository.save(pedido)

    return PedidoMapper.toDto(pedido)
  }

  private async buildItens (itens: ItemPedidoCreateDto[]): Promise<ItemPedido[]> {
    const itensPromise = itens.map(async (item) => {
      const produto = await this.produtoRepository.findById(item.produtoId)
      if (!produto) {
        throw new BusinessException('Produto não encontrado')
      }
      const ingredientes = item.ingredientesRemovidos.filter((ingredienteId) => produto.ingredientes.some((ingrediente) => ingrediente.id === ingredienteId))
      const ingredientesRemovidos = ingredientes.map((ingredienteId) => new Ingrediente({ id: ingredienteId }))

      return ItemPedido.create(
        produto,
        ingredientesRemovidos,
      )
    })

    return Promise.all(itensPromise)
  }

  async update (id: number, input: PedidoUpdateDto): Promise<PedidoDto> {
    const pedido = await this.repository.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    pedido.update(input)

    await this.repository.save(pedido)

    return PedidoMapper.toDto(pedido)
  }

  async findById (id: number): Promise<PedidoDto> {
    const pedido = await this.repository.findById(id)

    if (!pedido) {
      throw new BusinessException('Pedido não encontrado')
    }

    return PedidoMapper.toDto(pedido)
  }
}
