import { v4 as uuidv4 } from 'uuid'

export default class Ingrediente {
  readonly id: string
  public nome: string
  public imagemUrl: string | null
  public preco: number | null

  constructor (params?: Partial<Ingrediente>) {
    Object.assign(this, params)
  }

  static create (
    nome: string,
    preco?:number | null,
    imagemUrl?: string | null
 ): Ingrediente {
    const id = uuidv4()
    return new Ingrediente({ id, nome, preco, imagemUrl })
  }
}
