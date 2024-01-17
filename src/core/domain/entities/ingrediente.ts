export default class Ingrediente {
  readonly id: string
  nome: string

  constructor (params?: Partial<Ingrediente>) {
    Object.assign(this, params)
  }
}
