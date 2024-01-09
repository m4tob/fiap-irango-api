import ProdutoDto from '../dto/output/produto.dto';
import Produto from '../entities/produto';

export default class ProdutoMapper {
  static toProdutoDto(produto: Produto): ProdutoDto {
    return {
      ...produto,
    };
  }
}
