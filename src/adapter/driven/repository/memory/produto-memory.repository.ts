import { Injectable } from '@nestjs/common'

import Produto from '@/core/domain/entities/produto'
import IProdutoRepository from '@/core/domain/repositories/iproduto.repository'

@Injectable()
export default class ProdutoMemoryRepository implements IProdutoRepository {
  private alunos: Produto[] = []
  async create (input: Produto): Promise<void> {
    this.alunos.push(input)
  }

  findById (id: string): Promise<Produto | undefined> {
    return Promise.resolve(this.alunos.find((aluno) => aluno.id === id))
  }

  async save (input: Produto): Promise<void> {
    const index = this.alunos.findIndex((aluno) => aluno.id === input.id)

    if (index !== -1) {
      this.alunos.splice(index, 1)
    }

    return this.create(input)
  }

  async find (): Promise<Produto[]> {
    return this.alunos
  }

  async findByCategoria (): Promise<Produto[]> {
    return this.alunos
  }
}
