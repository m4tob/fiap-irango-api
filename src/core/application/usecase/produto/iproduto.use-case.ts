import ProdutoCreateDto from '@/core/domain/dto/input/produto-create.dto'
import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import Produto from '@/core/domain/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default interface IProdutoUseCase {
  create(input: ProdutoCreateDto): Promise<Produto>;
  update(input: ProdutoUpdateDto): Promise<Produto>;
  remove(productId: string): Promise<Produto>;
  list(): Promise<Produto[]>;
  findByCategoria(categoria: ProdutoCategoriaEnum): Promise<Produto[]>;
  findById(id: string): Promise<Produto>;
}

export const IProdutoUseCase = Symbol('IProdutoUseCase')
