import ProdutoDto from '@/core/domain/dto/output/produto.dto'
import Ingrediente from '@/core/domain/entities/ingrediente'
import Produto from '@/core/domain/entities/produto'

export default class ProdutoMapper {
  static toDto (produto: Produto): ProdutoDto {
    return {
      ...produto,
    }
  }

  static toDomainEntity (input: ProdutoDto): Produto {
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
