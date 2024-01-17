import { v4 as uuidv4 } from 'uuid'

import Ingrediente from '@/core/domain/entities/ingrediente'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

import ProdutoUpdateDto from '../dto/input/produto-update.dto'

export default class Produto {
  public constructor (
    public readonly id: string,
    public nome: string,
    public descricao: string,
    public preco: number,
    public categoria: ProdutoCategoriaEnum,
    public imagemUrl: string | null = null,
    public deletedAt: Date | null = null,
    public ingredientes: Ingrediente[] = [],
  ) {}

  static create (
     nome: string,
     descricao: string,
     preco: number,
     categoria: ProdutoCategoriaEnum,
     imagemUrl: string | null = null,
  ): Produto {
    const userId = uuidv4()
    return new Produto(userId, nome, descricao, preco, categoria, imagemUrl)
  }

  addIngrediente (nome: string):void {
    if (this.ingredientes.some((ingrediente) => ingrediente.nome === nome)) {
      throw new Error('Ingrediente já adicionado')
    }

    this.ingredientes.push(Ingrediente.create(nome))
  };

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
