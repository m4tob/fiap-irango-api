import Create from '@/core/application/usecase/pedido/create.use-case'
import FindById from '@/core/application/usecase/pedido/findById.use-case'
import List from '@/core/application/usecase/pedido/list.use-case'
import UpdatePayment from '@/core/application/usecase/pedido/update-payment.use-case'
import Update from '@/core/application/usecase/pedido/update.use-case'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'
import PedidoMapper from '@/core/domain/mappers/pedido.mapper'
import IConsumidorRepository from '@/core/domain/repositories/iconsumidor.repository'
import IPedidoRepository from '@/core/domain/repositories/ipedido.repository'
import IProdutoRepository from '@/core/domain/repositories/iproduto.repository'
import IPagamentoService from '@/core/domain/services/ipagamento.service'
import { ConsumidorGateway } from '@/core/operation/gateway/consumidor.gateway'
import { PagamentoGateway } from '@/core/operation/gateway/pagamento.gateway'
import { PedidoGateway } from '@/core/operation/gateway/pedido.gateway'
import { ProdutoGateway } from '@/core/operation/gateway/produto.gateway'
import CreatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/create-pedido.request'
import UpdatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/update-pedido.request'

export class PedidoController {
  constructor (
   private readonly repository: IPedidoRepository,
   private readonly consumidorRepository: IConsumidorRepository,
   private readonly produtoRepository: IProdutoRepository,
   private readonly pagamentoRepository: IPagamentoService,
  ) {}

  async list (): Promise<PedidoDto[]> {
    const useCase = new List(new PedidoGateway(this.repository))

    const pedidos = await useCase.handle()
    return pedidos.map((pedido) => PedidoMapper.toDto(pedido))
  }

  async create (
    input: CreatePedidoRequest
  ): Promise<PedidoDto> {
    const useCase = new Create(
      new PedidoGateway(this.repository),
      new ConsumidorGateway(this.consumidorRepository),
      new ProdutoGateway(this.produtoRepository),
      new PagamentoGateway(this.pagamentoRepository)
    )

    const pedido = await useCase.handle(input)

    return PedidoMapper.toDto(pedido)
  }

  async update (
     id: number,
    input: UpdatePedidoRequest
  ): Promise<PedidoDto> {
    const useCase = new Update(new PedidoGateway(this.repository))

    const pedido = await useCase.handle(id, input)
    return PedidoMapper.toDto(pedido)
  }

  async findById (
     id: number,
  ): Promise<PedidoDto> {
    const useCase = new FindById(new PedidoGateway(this.repository))

    const pedido = await useCase.handle(id)

    return PedidoMapper.toDto(pedido)
  }

  async updatePayment (
    id: number,
    paymentApproved: boolean
 ): Promise<PedidoDto> {
    const useCase = new UpdatePayment(new PedidoGateway(this.repository))

    const pedido = await useCase.handle(id, paymentApproved)

    return PedidoMapper.toDto(pedido)
  }
}
