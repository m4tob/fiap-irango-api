import { Injectable } from '@nestjs/common'

import Produto from 'src/core/domain/entities/produto'
import IProdutoRepository from 'src/core/domain/repositories/iproduto.repository'

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

    this.create(input)
  }

  async find (): Promise<Produto[]> {
    return this.alunos
  }
}
