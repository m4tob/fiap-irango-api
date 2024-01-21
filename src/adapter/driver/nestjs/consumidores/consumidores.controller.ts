import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'

import IConsumidorUseCase, {
  IConsumidorUseCase as Itest,
} from '@/core/application/iconsumidor.use-case'
import Cpf from '@/core/domain/value-object/Cpf'

import ConsumidorResponse from './dto/consumidor.response'
import CreateConsumidorDto from './dto/create-consumidor.dto'

@Controller('consumidores')
@ApiTags('consumidores')
export class ConsumidoresController {
  constructor (
    @Inject(Itest) private readonly consumidorUseCase: IConsumidorUseCase,
  ) {}

  @Get()
  list () {
    return this.consumidorUseCase.list()
  }

  @Post()
  @ApiOperation({ summary: 'Create consumidor' })
  @ApiBody({
    type: CreateConsumidorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ConsumidorResponse,
  })
  create (@Body() input: CreateConsumidorDto) {
    return this.consumidorUseCase.create(input)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update consumidor' })
  @ApiBody({
    type: CreateConsumidorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ConsumidorResponse,
  })
  update (@Param('id') id: string, @Body() input: CreateConsumidorDto) {
    return this.consumidorUseCase.update({ ...input, id })
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'find consumidor by cpf' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ConsumidorResponse,
  })
  findByCpf (@Param('cpf') cpf: string) {
    const cpfValidated = new Cpf(cpf)
    return this.consumidorUseCase.findByCpf(cpfValidated)
  }
}

