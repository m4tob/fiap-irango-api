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
} from 'src/core/application/iconsumidor.use-case'

import Consumidor from './dto/consumidor'
import CreateConsumidorDto from './dto/create-consumidor.dto'

@Controller('consumidores')
@ApiTags('consumidores')
export class ConsumidoresController {
  constructor (
    @Inject(Itest) private readonly consumidorUseCase: IConsumidorUseCase,
  ) {}

  @Get()
  list () {
    return this.consumidorUseCase.listConsumidores()
  }

  @Post()
  @ApiOperation({ summary: 'Create consumidor' })
  @ApiBody({
    type: CreateConsumidorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Consumidor,
  })
  create (@Body() input: CreateConsumidorDto) {
    return this.consumidorUseCase.createConsumidor(input)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update consumidor' })
  @ApiBody({
    type: CreateConsumidorDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Consumidor,
  })
  update (@Param('id') id: string, @Body() input: CreateConsumidorDto) {
    return this.consumidorUseCase.updateConsumidor({ ...input, id })
  }
}
