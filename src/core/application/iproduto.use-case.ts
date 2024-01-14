import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import ProdutoCreateDto from '../domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '../domain/dto/input/produto-update.dto'
import ProdutoDto from '../domain/dto/output/produto.dto'

export default interface IProdutoUseCase {
  create(input: ProdutoCreateDto): Promise<ProdutoDto>;
  update(input: ProdutoUpdateDto): Promise<ProdutoDto | undefined>;
  list(): Promise<ProdutoDto[]>;
  findByCategoria(categoria: ProdutoCategoriaEnum): Promise<ProdutoDto[]>;
}

export const IProdutoUseCase = Symbol('IProdutoUseCase')
