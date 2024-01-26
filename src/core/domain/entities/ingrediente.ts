import { v4 as uuidv4 } from 'uuid'

import IngredienteDto from '@/core/domain/dto/output/ingrediente.dto'
import Produto from '@/core/domain/entities/produto'

export default class Ingrediente implements IngredienteDto {
  readonly id?: string
  nome: string
  imagemUrl?: string
  preco?: number
  produtoId?: string

  constructor (params?: Partial<Ingrediente>) {
    Object.assign(this, params)
  }

  static create (
    produto: Produto,
    nome: string,
    imagemUrl?: string,
    preco?:number,
 ): Ingrediente {
    const id = uuidv4()
    return new Ingrediente({
      produtoId: produto.id,
      id,
      nome,
      imagemUrl,
      preco
    })
  }
}
