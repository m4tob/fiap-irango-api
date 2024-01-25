import Consumidor from '@/core/domain/entities/consumidor'
import Cpf from '@/core/domain/value-object/Cpf'

export default interface IConsumidorRepository {
  create(input: Consumidor): Promise<Consumidor>;
  findById(id: string): Promise<Consumidor | undefined>;
  findByCPF(cpf: Cpf): Promise<Consumidor | undefined>;
  save(input: Consumidor): Promise<Consumidor>;
  find(): Promise<Consumidor[]>;
}

export const IConsumidorRepository = Symbol('IConsumidorRepository')
