import { v4 as uuidv4 } from 'uuid'

import ProdutoUpdateDto from '@/core/domain/dto/input/produto-update.dto'
import Ingrediente from '@/core/domain/entities/ingrediente'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import BusinessException from '@/core/domain/errors/business-exception'

export default class Produto {
  readonly id: string
  nome: string
  descricao: string
  imagemUrl?: string
  preco: number
  categoria: ProdutoCategoriaEnum
  ingredientes: Ingrediente[] = []
  deletedAt?: Date

  public constructor (params?: Partial<Produto>) {
    Object.assign(this, params)
  }

  static create (
     nome: string,
     descricao: string,
     imagemUrl: string | undefined,
     preco: number,
     categoria: ProdutoCategoriaEnum,
  ): Produto {
    const id = uuidv4()
    return new Produto({ id, nome, descricao, imagemUrl, preco, categoria })
  }

  addIngrediente (
    produto: Produto,
    nome: string,
    preco?: number,
    imagemUrl?: string
  ):void {
    if (this.ingredientes.some((ingrediente) => ingrediente.nome === nome)) {
      throw new BusinessException('Ingrediente já adicionado')
    }

    this.ingredientes.push(Ingrediente.create(produto, nome, imagemUrl, preco))
  };

  update (input: ProdutoUpdateDto): void {
    this.nome = input.nome
    this.imagemUrl = input.imagemUrl
    this.descricao = input.descricao
    this.preco = input.preco
    this.categoria = input.categoria

    const ingredientes = input.ingredientes?.map(ingrediente => {
      if ('id' in ingrediente) {
        return new Ingrediente(ingrediente)
      }
      return Ingrediente.create(
        this,
        ingrediente.nome,
        ingrediente.imagemUrl,
        ingrediente.preco
      )
    })
    this.ingredientes = ingredientes ?? []
  }

  delete (date: Date = new Date()): void {
    this.deletedAt = date
  }
}
