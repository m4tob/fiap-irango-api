import {
  Body,
  Controller,
  Delete,
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

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import Repository, { IProdutoRepository } from '@/core/domain/repositories/iproduto.repository'
import AppCache from '@/core/helpers/AppCache'
import { ProdutoController } from '@/core/operation/controllers/produto.controller'
import UpdateProdutoRequest from '@/infra/web/nestjs/produtos/dto/update-produto.request'

import CreateProdutoRequest from './dto/create-produto.request'
import ProdutoResponse from './dto/produto.response'

const PRODUTOS_CACHE_KEY = 'cache:produtos:list'
const PRODUTOS_CATEGORIA_CACHE_KEY = (categoria: string) => 'cache:produtos:search:categoria=' + categoria
const PRODUTOS_CACHE_TTL = 1 * 60 * 60 * 1000 // 1 hour

@Controller('v1/produtos')
@ApiTags('v1/produtos')
export default class ProdutosController {
  constructor (
    @Inject(IProdutoRepository) private readonly repository: Repository,
    private appCache: AppCache,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os Produtos' })
  @ApiOkResponse({ description: 'Todos os Produtos', type: [ProdutoResponse], isArray: true })
  async list (): Promise<ProdutoResponse[]> {
    const cached = await this.appCache.get<ProdutoResponse[]>(PRODUTOS_CACHE_KEY)
    if (cached) {
      return cached
    }
    const controller = new ProdutoController(this.repository)

    const output = await controller.list()
    await this.appCache.set(PRODUTOS_CACHE_KEY, output, PRODUTOS_CACHE_TTL)

    return output
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo Produto' })
  @ApiBody({ type: CreateProdutoRequest })
  @ApiCreatedResponse({ description: 'Registro criado', type: ProdutoResponse })
  async create (
    @Body() input: CreateProdutoRequest
  ): Promise<ProdutoResponse> {
    const controller = new ProdutoController(this.repository)

    const output = await controller.create(input)

    await this.appCache.del(PRODUTOS_CACHE_KEY)
    await this.appCache.del(PRODUTOS_CATEGORIA_CACHE_KEY(input.categoria))

    return output
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um Produto' })
  @ApiParam({ name: 'id', required: true, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  @ApiBody({ type: UpdateProdutoRequest })
  @ApiOkResponse({ description: 'O registro atualizado', type: ProdutoResponse })
  async update (
    @Param('id') id: string,
    @Body() input: UpdateProdutoRequest
  ): Promise<ProdutoResponse> {
    const controller = new ProdutoController(this.repository)

    const output = await controller.update({ ...input, id })

    await this.appCache.del(PRODUTOS_CACHE_KEY)
    await Promise.all(Object.values(ProdutoCategoriaEnum).map(async (categoria) => {
      await this.appCache.del(PRODUTOS_CATEGORIA_CACHE_KEY(categoria))
    }))

    return output
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um Produto' })
  @ApiParam({ name: 'id', required: true, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  @ApiOkResponse({ description: 'O registro excluído', type: ProdutoResponse })
  async remove (
    @Param('id') id: string
  ): Promise<ProdutoResponse> {
    const controller = new ProdutoController(this.repository)

    const output = await controller.remove(id)

    await this.appCache.del(PRODUTOS_CACHE_KEY)
    await Promise.all(Object.values(ProdutoCategoriaEnum).map(async (categoria) => {
      await this.appCache.del(PRODUTOS_CATEGORIA_CACHE_KEY(categoria))
    }))

    return output
  }

  @Get('/search')
  @ApiOperation({ summary: 'Buscar Produto por categoria' })
  @ApiQuery({ name: 'categoria', required: true, enum: Object.values(ProdutoCategoriaEnum), example: 'lanche' })
  @ApiOkResponse({ description: 'O registro encontrado', type: ProdutoResponse })
  async search (
    @Query('categoria') categoria: ProdutoCategoriaEnum
  ): Promise<ProdutoResponse[]> {
    const cached = await this.appCache.get<ProdutoResponse[]>(PRODUTOS_CATEGORIA_CACHE_KEY(categoria))
    if (cached) {
      return cached
    }
    const controller = new ProdutoController(this.repository)

    const output = await controller.findByCategoria(categoria)
    await this.appCache.set(PRODUTOS_CATEGORIA_CACHE_KEY(categoria), output, PRODUTOS_CACHE_TTL)

    return output
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontrar um Produto por ID' })
  @ApiParam({ name: 'id', required: true, example: 'f1453a0d-4b53-4ff9-8b17-709e089ca805' })
  @ApiOkResponse({ description: 'O registro encontrado', type: ProdutoResponse })
  findById (
    @Param('id') id: string
  ): Promise<ProdutoResponse> {
    const controller = new ProdutoController(this.repository)

    return controller.findById(id)
  }
}
