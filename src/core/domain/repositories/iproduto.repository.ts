import Produto from '../entities/produto'

export default interface IProdutoRepository {
  create(input: Produto): Promise<void>;
  findById(id: string): Promise<Produto | undefined>;
  save(input: Produto): Promise<void>;
  find(): Promise<Produto[]>;
}

export const IProdutoRepository = Symbol('IProdutoRepository')
