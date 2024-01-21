import { v4 as uuidv4 } from 'uuid'

import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import Cpf from '@/core/domain/value-object/Cpf'
import Email from '@/core/domain/value-object/email'

export default class Consumidor {
  public constructor (
    public readonly id: string,
    public nome: string,
    public cpf: Cpf,
    public email: Email,
  ) {}

  static create (
    nome: string,
    cpf: string,
    email: string,
  ): Consumidor {
    const userId = uuidv4()
    return new Consumidor(userId, nome, new Cpf(cpf), new Email(email))
  }

  update (input: ConsumidorUpdateDto) {
    this.nome = input.nome
    this.cpf = new Cpf(input.cpf)
    this.email = new Email(input.email)
  }
}
