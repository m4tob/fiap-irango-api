import { Inject } from '@nestjs/common'

import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import ProdutoDto from '@/core/domain/dto/output/produto.dto'
import Produto from '@/core/domain/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import ProdutoMapper from '@/core/domain/mappers/produto.mapper'
import IProdutoRepository, {
  IProdutoRepository as IProdutoRepositorySymbol,
} from '@/core/domain/repositories/iproduto.repository'

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
      input.imagemUrl,
      input.preco,
      input.categoria,
    )

    input.ingredientes?.forEach(ingredienteInput => {
      produto.addIngrediente(
        ingredienteInput.nome,
        ingredienteInput.preco,
        ingredienteInput.imagemUrl
      )
    })

    await this.repository.create(produto)
    return ProdutoMapper.toDto(produto)
  }

  async update (input: ProdutoUpdateDto): Promise<ProdutoDto> {
    const produto = await this.repository.findById(input.id)

    if (!produto) {
      throw new BusinessException('Produto não encontrado')
    }

    produto.update(input)

    await this.repository.save(produto)

    return ProdutoMapper.toDto(produto)
  }

  async list (): Promise<ProdutoDto[]> {
    const produtos = await this.repository.find()

    return produtos.map((produto) => {
      return ProdutoMapper.toDto(produto)
    })
  }

  async findByCategoria (categoria: ProdutoCategoriaEnum): Promise<ProdutoDto[]> {
    const produtos = await this.repository.findByCategoria(categoria)

    return produtos.map((produto) => {
      return ProdutoMapper.toDto(produto)
    })
  }

  async findById (id: string): Promise<ProdutoDto> {
    const produto = await this.repository.findById(id)

    if (!produto) {
      throw new BusinessException('Produto não encontrado')
    }

    return ProdutoMapper.toDto(produto)
  }

  async remove (productId: string): Promise<ProdutoDto> {
    const produto = await this.repository.findById(productId)

    if (!produto) {
      throw new BusinessException('Produto não encontrado')
    }

    produto.delete()

    await this.repository.save(produto)

    return ProdutoMapper.toDto(produto)
  }
}
