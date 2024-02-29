import ProdutoUseCase from '@/core/application/usecase/produto/produto.use-case'
import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import ProdutoDto from '@/core/domain/dto/output/produto.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import ProdutoMapper from '@/core/domain/mappers/produto.mapper'
import IProdutoRepository from '@/core/domain/repositories/iproduto.repository'
import { ProdutoGateway } from '@/core/operation/gateway/produto.gateway'

export class ProdutoController {
  constructor (
   private readonly produtoRepository: IProdutoRepository,
  ) {}

  async create (
    input: ProdutoCreateDto
  ): Promise<ProdutoDto> {
    const useCase = new ProdutoUseCase(
      new ProdutoGateway(this.produtoRepository),
    )

    const pedido = await useCase.create(input)

    return ProdutoMapper.toDto(pedido)
  }

  async update (
    input: ProdutoUpdateDto
  ): Promise<ProdutoDto> {
    const useCase = new ProdutoUseCase(new ProdutoGateway(this.produtoRepository))

    const pedido = await useCase.update(input)
    return ProdutoMapper.toDto(pedido)
  }

  async list (): Promise<ProdutoDto[]> {
    const useCase = new ProdutoUseCase(new ProdutoGateway(this.produtoRepository))

    const produto = await useCase.list()
    return produto.map((pedido) => ProdutoMapper.toDto(pedido))
  }

  async findById (
     id: string,
  ): Promise<ProdutoDto> {
    const useCase = new ProdutoUseCase(new ProdutoGateway(this.produtoRepository))

    const produto = await useCase.findById(id)

    return ProdutoMapper.toDto(produto)
  }

  async findByCategoria (
    categoria: ProdutoCategoriaEnum
 ): Promise<ProdutoDto[]> {
    const useCase = new ProdutoUseCase(new ProdutoGateway(this.produtoRepository))

    const produto = await useCase.findByCategoria(categoria)

    return produto.map((pedido) => ProdutoMapper.toDto(pedido))
  }

  async remove (
    id: string,
 ): Promise<ProdutoDto> {
    const useCase = new ProdutoUseCase(new ProdutoGateway(this.produtoRepository))

    const produto = await useCase.remove(id)

    return ProdutoMapper.toDto(produto)
  }
}
