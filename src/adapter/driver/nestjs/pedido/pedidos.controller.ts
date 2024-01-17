import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import PedidoResponse from '@/adapter/driver/nestjs/pedido/dto/pedido.response'
import UpdatePedidoDto from '@/adapter/driver/nestjs/pedido/dto/update-pedido.dto'
import IPedidoUseCase from '@/core/application/ipedido.use-case'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'

import CreatePedidoDto from './dto/create-pedido.dto'

@Controller('pedidos')
@ApiTags('pedidos')
export class PedidosController {
  constructor (
    private readonly pedidoUseCase: IPedidoUseCase
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os pedidos' })
  @ApiOkResponse({ description: 'Pedidos', type: [PedidoResponse] })
  list (): Promise<PedidoDto[]> {
    return this.pedidoUseCase.list()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo pedido' })
  @ApiCreatedResponse({ description: 'Pedido criado', type: PedidoResponse })
  create (
    @Body() input: CreatePedidoDto
  ): Promise<PedidoDto> {
    return this.pedidoUseCase.create(input)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza as informações de um dado pedido' })
  @ApiOkResponse({ description: 'Pedido atualizado', type: PedidoResponse })
  update (
    @Param('id') id: number,
    @Body() input: UpdatePedidoDto
  ): Promise<PedidoDto> {
    return this.pedidoUseCase.update(id, input)
  }
}
