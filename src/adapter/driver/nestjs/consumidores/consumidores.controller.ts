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
  Query,
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'

import UpdateConsumidorRequest from '@/adapter/driver/nestjs/consumidores/dto/update-consumidor.request'
import IConsumidorUseCase, {
  IConsumidorUseCase as IConsumidorUseCaseSymbol,
} from '@/core/application/iconsumidor.use-case'
import Cpf from '@/core/domain/value-object/Cpf'

import ConsumidorResponse from './dto/consumidor.response'
import CreateConsumidorRequest from './dto/create-consumidor.request'

@Controller('v1/consumidores')
@ApiTags('v1/consumidores')
export default class ConsumidoresController {
  constructor (
    @Inject(IConsumidorUseCaseSymbol) private readonly consumidorUseCase: IConsumidorUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os Consumidores' })
  @ApiOkResponse({ description: 'Todos os Consumidor', type: [ConsumidorResponse], isArray: true })
  list (): Promise<ConsumidorResponse[]> {
    return this.consumidorUseCase.list()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo Consumidor' })
  @ApiBody({ type: CreateConsumidorRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: ConsumidorResponse })
  create (
    @Body() input: CreateConsumidorRequest
  ): Promise<ConsumidorResponse> {
    return this.consumidorUseCase.create(input)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um dado Consumidor' })
  @ApiParam({ name: 'id', required: true, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  @ApiBody({ type: UpdateConsumidorRequest })
  @ApiOkResponse({ description: 'O registro atualizado', type: ConsumidorResponse })
  update (
    @Param('id') id: string,
    @Body() input: UpdateConsumidorRequest
  ): Promise<ConsumidorResponse> {
    return this.consumidorUseCase.update({ ...input, id })
  }

  @Get('/search')
  @ApiOperation({ summary: 'Buscar Consumidor por CPF' })
  @ApiQuery({ name: 'cpf', required: true, example: '12345678900' })
  @ApiOkResponse({ description: 'O registro encontrado', type: ConsumidorResponse })
  search (
    @Query('cpf') cpf: string
  ): Promise<ConsumidorResponse> {
    const validateCpf = false
    const cpfValidated = new Cpf(cpf, validateCpf)

    return this.consumidorUseCase.findByCpf(cpfValidated)
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Encontrar um Consumidor por ID' })
  @ApiParam({ name: 'id', required: true, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  @ApiOkResponse({ description: 'O registro encontrado', type: ConsumidorResponse })
  findById (
    @Param('id') id: string,
  ): Promise<ConsumidorResponse> {
    return this.consumidorUseCase.findById(id)
  }
}

