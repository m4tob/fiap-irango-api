import { v4 as uuidv4 } from 'uuid'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import ProdutoUpdateDto from '../dto/input/produto-update.dto'

export default class Produto {
  public constructor (
    public readonly id: string,
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: ProdutoCategoriaEnum,
  ) {}

  static create (
     nome: string,
     descricao: string,
     preco: number,
     categoria: ProdutoCategoriaEnum,
  ): Produto {
    const userId = uuidv4()
    return new Produto(userId, nome, descricao, preco, categoria)
  }

  update (input: ProdutoUpdateDto) {
    this.nome = input.nome
    this.preco = input.preco
    this.descricao = input.descricao
    this.categoria = input.categoria
  }
}
