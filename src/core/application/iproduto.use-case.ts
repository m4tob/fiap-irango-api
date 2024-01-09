import ProdutoCreateDto from '../domain/dto/input/produto-create.dto';
import ProdutoUpdateDto from '../domain/dto/input/produto-update.dto';
import ProdutoDto from '../domain/dto/output/produto.dto';

export default interface IProdutoUseCase {
  createProduto(input: ProdutoCreateDto): Promise<ProdutoDto>;
  updateProduto(input: ProdutoUpdateDto): Promise<ProdutoDto | undefined>;
  listProdutos(): Promise<ProdutoDto[]>;
}

export const IProdutoUseCase = Symbol('IProdutoUseCase');
