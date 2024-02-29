import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import IPedidoUseCase, {
  IPedidoUseCase as IPedidoUseCaseSymbol,
} from '@/core/application/usecase/pedido/ipedido.use-case'
import UpdatePagamentoPayload from '@/infra/web/mercado-pago/dto/update-pagamento-payload'
import PedidoResponse from '@/infra/web/nestjs/pedidos/dto/pedido.response'
import UpdatePedidoRequest from '@/infra/web/nestjs/pedidos/dto/update-pedido.request'

import CreatePedidoRequest from './dto/create-pedido.request'

@Controller('v1/pedidos')
@ApiTags('v1/pedidos')
export default class PedidosController {
  constructor (
    @Inject(IPedidoUseCaseSymbol) private readonly pedidoUseCase: IPedidoUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os Pedidos' })
  @ApiOkResponse({ description: 'Todos os Pedidos', type: [PedidoResponse], isArray: true })
  list (): Promise<PedidoResponse[]> {
    return this.pedidoUseCase.list()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo Pedido' })
  @ApiBody({ type: CreatePedidoRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: PedidoResponse })
  create (
    @Body() input: CreatePedidoRequest
  ): Promise<PedidoResponse> {
    return this.pedidoUseCase.create(input)
  }

  @Post('/pagamento-webhook/mercado-pago')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar um Pedido a partir do evento do gateway de pagamento' })
  @ApiBody({ type: UpdatePagamentoPayload })
  @ApiOkResponse({ description: 'O registro atualizado', type: PedidoResponse })
  pagamentoWebhook (
    @Body() input: UpdatePagamentoPayload
  ): Promise<PedidoResponse> {
    const pedidoId = parseInt(input.external_reference)
    const paymentApproved = !!input.date_approved

    return this.pedidoUseCase.updatePayment(pedidoId, paymentApproved)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um Pedido' })
  @ApiParam({ name: 'id', required: true, example: 12345 })
  @ApiBody({ type: UpdatePedidoRequest })
  @ApiOkResponse({ description: 'O registro atualizado', type: PedidoResponse })
  update (
    @Param('id') id: number,
    @Body() input: UpdatePedidoRequest
  ): Promise<PedidoResponse> {
    return this.pedidoUseCase.update(id, input)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Encontrar um Pedido por ID' })
  @ApiParam({ name: 'id', required: true, example: 12345 })
  @ApiOkResponse({ description: 'O registro encontrado', type: PedidoResponse })
  findById (
    @Param('id') id: number,
  ): Promise<PedidoResponse> {
    return this.pedidoUseCase.findById(id)
  }
}
