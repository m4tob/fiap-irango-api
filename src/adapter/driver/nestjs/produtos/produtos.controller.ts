import { CACHE_MANAGER } from '@nestjs/cache-manager'
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

import { Cache } from 'cache-manager'

import UpdateProdutoDto from '@/adapter/driver/nestjs/produtos/dto/update-produto.dto'
import IProdutoUseCase, {
  IProdutoUseCase as IProdutoUseCaseSymbol,
} from '@/core/application/iproduto.use-case'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import CreateProdutoDto from './dto/create-produto.dto'
import ProdutoResponse from './dto/produto.response'

const PRODUTOS_CACHE_KEY = 'cache:produtos:list'
const PRODUTOS_CATEGORIA_CACHE_KEY = (categoria: string) => 'cache:produtos:findByCategoria:' + categoria
const PRODUTOS_CACHE_TTL = 1 * 60 * 60 * 1000 // 1 hour

@Controller('v1/produtos')
@ApiTags('v1/produtos')
export default class ProdutosController {
  constructor (
    @Inject(IProdutoUseCaseSymbol) private readonly produtoUseCase: IProdutoUseCase,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'products' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [ProdutoResponse],
  })
  async list () {
    const cached = await this.cacheManager.get(PRODUTOS_CACHE_KEY)
    if (cached) {
      return cached
    }

    const output = await this.produtoUseCase.list()
    await this.cacheManager.set(PRODUTOS_CACHE_KEY, output, PRODUTOS_CACHE_TTL)

    return output
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
  async findByCategoria (@Param('categoria') categoria: ProdutoCategoriaEnum) {
    const cached = await this.cacheManager.get(PRODUTOS_CATEGORIA_CACHE_KEY(categoria))
    if (cached) {
      return cached
    }

    const output = await this.produtoUseCase.findByCategoria(categoria)
    await this.cacheManager.set(PRODUTOS_CATEGORIA_CACHE_KEY(categoria), output, PRODUTOS_CACHE_TTL)

    return output
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
  async create (@Body() input: CreateProdutoDto) {
    const output = await this.produtoUseCase.create(input)

    await this.cacheManager.del(PRODUTOS_CACHE_KEY)
    await this.cacheManager.del(PRODUTOS_CATEGORIA_CACHE_KEY(input.categoria))

    return output
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
  async update (@Param('id') id: string, @Body() input: UpdateProdutoDto) {
    const output = await this.produtoUseCase.update({ ...input, id })

    await this.cacheManager.del(PRODUTOS_CACHE_KEY)
    await Promise.all(Object.values(ProdutoCategoriaEnum).map(async (categoria) => {
      await this.cacheManager.del(PRODUTOS_CATEGORIA_CACHE_KEY(categoria))
    }))

    return output
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove produto' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: ProdutoResponse,
  })
  async remove (@Param('id') id: string) {
    const output = await this.produtoUseCase.remove(id)

    await this.cacheManager.del(PRODUTOS_CACHE_KEY)
    await Promise.all(Object.values(ProdutoCategoriaEnum).map(async (categoria) => {
      await this.cacheManager.del(PRODUTOS_CATEGORIA_CACHE_KEY(categoria))
    }))

    return output
  }
}
