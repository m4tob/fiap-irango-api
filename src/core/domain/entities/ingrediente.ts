import { v4 as uuidv4 } from 'uuid'

export default class Ingrediente {
  readonly id: string
  nome: string
  imagemUrl?: string
  preco?: number

  constructor (params?: Partial<Ingrediente>) {
    Object.assign(this, params)
  }

  static create (
    nome: string,
    imagemUrl?: string,
    preco?:number,
 ): Ingrediente {
    const id = uuidv4()
    return new Ingrediente({ id, nome, imagemUrl, preco })
  }
}
