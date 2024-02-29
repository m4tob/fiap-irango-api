import Consumidor from '@/core/domain/entities/consumidor'
import Repository from '@/core/domain/repositories/iconsumidor.repository'
import Cpf from '@/core/domain/value-object/Cpf'

export class ConsumidorGateway {
  constructor (private respository: Repository) {
  }

  findById (id: string): Promise<Consumidor | undefined> {
    const produto = this.respository.findById(id)
    return produto
  }

  create (input: Consumidor): Promise<Consumidor> {
    return this.respository.create(input)
  }

  findByCPF (cpf: Cpf): Promise<Consumidor | undefined> {
    return this.respository.findByCPF(cpf)
  }

  save (input: Consumidor): Promise<Consumidor> {
    return this.respository.save(input)
  }

  find (): Promise<Consumidor[]> {
    return this.respository.find()
  }
}
