import { v4 as uuidv4 } from 'uuid'

import Ingrediente from '@/core/domain/entities/ingrediente'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import ProdutoUpdateDto from '../dto/input/produto-update.dto'

export default class Produto {
  readonly id: string
  nome: string
  descricao: string
  preco: number
  categoria: ProdutoCategoriaEnum
  deletedAt?: Date = undefined
  ingredientes: Ingrediente[] = []

  public constructor (params?: Partial<Produto>) {
    Object.assign(this, params)
  }

  static create (
     nome: string,
     descricao: string,
     preco: number,
     categoria: ProdutoCategoriaEnum,
  ): Produto {
    const id = uuidv4()
    return new Produto({ id, nome, descricao, preco, categoria })
  }

  update (input: ProdutoUpdateDto): void {
    this.nome = input.nome
    this.preco = input.preco
    this.descricao = input.descricao
    this.categoria = input.categoria
  }

  delete (date: Date = new Date()): void {
    this.deletedAt = date
  }
}
