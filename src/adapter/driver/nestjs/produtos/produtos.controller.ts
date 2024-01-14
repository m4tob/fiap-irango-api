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

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import CreateProdutoDto from './dto/create-produto.dto'
import Produto from './dto/produto'

@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController {
  constructor (@Inject(Itest) private readonly produtoUseCase: IProdutoUseCase) {}

  @Get()
  list () {
    return this.produtoUseCase.list()
  }

  @Get('/categorias/:categoria')
  @ApiOperation({ summary: 'products Find By categoria' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Produto],
  })
  findByCategoria (@Param('categoria') categoria: ProdutoCategoriaEnum) {
    return this.produtoUseCase.findByCategoria(categoria)
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
    return this.produtoUseCase.create(input)
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
    return this.produtoUseCase.update({ ...input, id })
  }
}
