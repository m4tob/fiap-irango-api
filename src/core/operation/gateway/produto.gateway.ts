import Produto from '@/core/domain/entities/produto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import Repository from '@/core/domain/repositories/iproduto.repository'

export class ProdutoGateway {
  constructor (private respository: Repository) {}

  findById (id: string): Promise<Produto | undefined> {
    return this.respository.findById(id)
  }

  findByCategoria (categoria: ProdutoCategoriaEnum): Promise<Produto[]> {
    const produto = this.respository.findByCategoria(categoria)
    return produto
  }

  create (input: Produto): Promise<void> {
    return this.respository.create(input)
  }

  save (input: Produto): Promise<void> {
    return this.respository.save(input)
  }

  find (): Promise<Produto[]> {
    return this.respository.find()
  }
}
