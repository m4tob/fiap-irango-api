import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import Produto from '@/core/domain/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import BusinessException from '@/core/domain/errors/business-exception'
import { ProdutoGateway } from '@/core/operation/gateway/produto.gateway'

import IProdutoUseCase from './iproduto.use-case'

export default class ProdutoUseCase implements IProdutoUseCase {
  constructor (
    private readonly gateway: ProdutoGateway,
  ) {}

  async create (input: ProdutoCreateDto): Promise<Produto> {
    const produto = Produto.create(
      input.nome,
      input.descricao,
      input.imagemUrl,
      input.preco,
      input.categoria,
    )

    await this.gateway.create(produto)

    input.ingredientes?.forEach(ingredienteInput => {
      produto.addIngrediente(
        produto,
        ingredienteInput.nome,
        ingredienteInput.preco,
        ingredienteInput.imagemUrl
      )
    })

    await this.gateway.save(produto)
    return produto
  }

  async update (input: ProdutoUpdateDto): Promise<Produto> {
    const produto = await this.gateway.findById(input.id)

    if (!produto) {
      throw new BusinessException('Produto não encontrado')
    }

    produto.update(input)

    await this.gateway.save(produto)

    return produto
  }

  async list (): Promise<Produto[]> {
    const produtos = await this.gateway.find()

    return produtos
  }

  async findByCategoria (categoria: ProdutoCategoriaEnum): Promise<Produto[]> {
    return this.gateway.findByCategoria(categoria)
  }

  async findById (id: string): Promise<Produto> {
    const produto = await this.gateway.findById(id)

    if (!produto) {
      throw new BusinessException('Produto não encontrado')
    }

    return produto
  }

  async remove (productId: string): Promise<Produto> {
    const produto = await this.gateway.findById(productId)

    if (!produto) {
      throw new BusinessException('Produto não encontrado')
    }

    produto.delete()

    await this.gateway.save(produto)

    return produto
  }
}
