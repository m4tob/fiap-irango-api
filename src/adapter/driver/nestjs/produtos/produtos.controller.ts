import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'

import UpdateProdutoDto from '@/adapter/driver/nestjs/produtos/dto/update-produto.dto'
import IProdutoUseCase, {
  IProdutoUseCase as Itest,
} from '@/core/application/iproduto.use-case'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import CreateProdutoDto from './dto/create-produto.dto'
import ProdutoResponse from './dto/produto.response'

@Controller('produtos')
@ApiTags('produtos')
export class ProdutosController {
  constructor (@Inject(Itest) private readonly produtoUseCase: IProdutoUseCase) {}

  @Get()
  @ApiOperation({ summary: 'products' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ProdutoResponse],
  })
  list () {
    return this.produtoUseCase.list()
  }

  @Get(':id')
  @ApiOperation({ summary: 'product find by Id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ProdutoResponse],
  })
  findById (@Param('id') id: string) {
    return this.produtoUseCase.findById(id)
  }

  @Get('/categorias/:categoria')
  @ApiOperation({ summary: 'products Find By categoria' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ProdutoResponse],
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
    type: ProdutoResponse,
  })
  create (@Body() input: CreateProdutoDto) {
    return this.produtoUseCase.create(input)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update produto' })
  @ApiBody({
    type: UpdateProdutoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ProdutoResponse,
  })
  update (@Param('id') id: string, @Body() input: UpdateProdutoDto) {
    return this.produtoUseCase.update({ ...input, id })
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove produto' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ProdutoResponse,
  })
  remove (@Param('id') id: string) {
    return this.produtoUseCase.remove(id)
  }
}
