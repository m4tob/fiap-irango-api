import { Inject } from '@nestjs/common'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import ProdutoCreateDto from '../domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '../domain/dto/input/produto-update.dto'
import ProdutoDto from '../domain/dto/output/produto.dto'
import Produto from '../domain/entities/produto'
import ProdutoMapper from '../domain/mappers/produto.mapper'
import IProdutoRepository, {
  IProdutoRepository as IProdutoRepositorySymbol,
} from '../domain/repositories/iproduto.repository'
import IProdutoUseCase from './iproduto.use-case'

export default class ProdutoUseCase implements IProdutoUseCase {
  constructor (
    @Inject(IProdutoRepositorySymbol)
    private readonly repository: IProdutoRepository,
  ) {}

  // TODO: alterar camada do mapper
  async create (input: ProdutoCreateDto): Promise<ProdutoDto> {
    const produto = Produto.create(
      input.nome,
      input.descricao,
      input.preco,
      input.categoria,
    )

    await this.repository.create(produto)
    return ProdutoMapper.toProdutoDto(produto)
  }

  async update (input: ProdutoUpdateDto): Promise<ProdutoDto | undefined> {
    const produto = await this.repository.findById(input.id)

    if (!produto) {
      return undefined
    }

    produto.update(input)

    await this.repository.save(produto)

    return ProdutoMapper.toProdutoDto(produto)
  }

  async list (): Promise<ProdutoDto[]> {
    const produtos = await this.repository.find()

    return produtos.map((produto) => {
      return ProdutoMapper.toProdutoDto(produto)
    })
  }

  async findByCategoria (categoria: ProdutoCategoriaEnum): Promise<ProdutoDto[]> {
    const produtos = await this.repository.findByCategoria(categoria)

    return produtos.map((produto) => {
      return ProdutoMapper.toProdutoDto(produto)
    })
  }
}
