import Ingrediente from '@/core/domain/entities/ingrediente'

import ProdutoDto from '../dto/output/produto.dto'
import Produto from '../entities/produto'

export default class ProdutoMapper {
  static toProdutoDto (produto: Produto): ProdutoDto {
    return {
      ...produto,
    }
  }

  static toDtoForProduto (input: ProdutoDto): Produto {
    const ingredientes = input
      .ingredientes.map(ingrediente => new Ingrediente(ingrediente))

    return new Produto({
      id: input.id,
      nome: input.nome,
      imagemUrl: input.imagemUrl,
      descricao: input.descricao,
      preco: input.preco,
      categoria: input.categoria,
      deletedAt: input.deletedAt,
      ingredientes
    })
  }
}
