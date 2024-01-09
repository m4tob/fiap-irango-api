import Consumidor from '../entities/consumidor'

export default interface IConsumidorRepository {
  create(input: Consumidor): Promise<void>;
  findById(id: string): Promise<Consumidor | undefined>;
  save(input: Consumidor): Promise<void>;
  find(): Promise<Consumidor[]>;
}

export const IConsumidorRepository = Symbol('IConsumidorRepository')
