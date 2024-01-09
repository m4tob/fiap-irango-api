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

import IProdutoUseCase, {
  IProdutoUseCase as Itest,
} from 'src/core/application/iproduto.use-case'

import CreateProdutoDto from './dto/create-produto.dto'
import Produto from './dto/produto.'

@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController {
  constructor (@Inject(Itest) private readonly produtoUseCase: IProdutoUseCase) {}

  @Get()
  list () {
    return this.produtoUseCase.listProdutos()
  }

  @Post()
  @ApiOperation({ summary: 'Create produto' })
  @ApiBody({
    type: CreateProdutoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Produto,
  })
  create (@Body() input: CreateProdutoDto) {
    return this.produtoUseCase.createProduto(input)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update produto' })
  @ApiBody({
    type: CreateProdutoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Produto,
  })
  update (@Param('id') id: string, @Body() input: CreateProdutoDto) {
    return this.produtoUseCase.updateProduto({ ...input, id })
  }
}
