import { v4 as uuidv4 } from 'uuid'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import ProdutoUpdateDto from '../dto/input/produto-update.dto'

export default class Produto {
  public constructor (
    public readonly id: string,
    public nome: string,
    public description: string,
    public preco: number,
    public categoriaId: ProdutoCategoriaEnum,
  ) {}

  static create (
     nome: string,
     description: string,
     preco: number,
     categoriaId: ProdutoCategoriaEnum,
  ): Produto {
    const userId = uuidv4()
    return new Produto(userId, nome, description, preco, categoriaId)
  }

  update (input: ProdutoUpdateDto) {
    this.nome = input.nome
    this.preco = input.preco
    this.description = input.description
    this.categoriaId = input.categoriaId
  }
}
