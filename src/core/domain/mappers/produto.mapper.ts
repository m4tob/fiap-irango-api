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
    const ingredientes =input
        .ingredientes.map(ingrediente=>new  Ingrediente(ingrediente))

    return new Produto(input.id,
            input.nome,
            input.descricao,
            input.preco,
            input.categoria,
            input.imagemUrl,
            input.deletedAt,
            ingredientes)
  }
}
