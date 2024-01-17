import { v4 as uuidv4 } from 'uuid'

export default class Ingrediente {
  readonly id: string
  public nome: string

  constructor (params?: Partial<Ingrediente>) {
    Object.assign(this, params)
  }

  static create (
    nome: string,
 ): Ingrediente {
    const id = uuidv4()
    return new Ingrediente({ id, nome })
  }
}
