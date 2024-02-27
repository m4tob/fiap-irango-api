import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import ProdutoDto from '@/core/domain/dto/output/produto.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default interface IProdutoUseCase {
  create(input: ProdutoCreateDto): Promise<ProdutoDto>;
  update(input: ProdutoUpdateDto): Promise<ProdutoDto>;
  remove(productId: string): Promise<ProdutoDto>;
  list(): Promise<ProdutoDto[]>;
  findByCategoria(categoria: ProdutoCategoriaEnum): Promise<ProdutoDto[]>;
  findById(id: string): Promise<ProdutoDto>;
}

export const IProdutoUseCase = Symbol('IProdutoUseCase')
