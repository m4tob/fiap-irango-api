import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import Consumidor from '@/core/domain/entities/consumidor'
import Cpf from '@/core/domain/value-object/Cpf'

export default interface IConsumidorUseCase {
  list(): Promise<Consumidor[]>;
  create(input: ConsumidorCreateDto): Promise<Consumidor>;
  update(input: ConsumidorUpdateDto): Promise<Consumidor>;
  findById(id: string): Promise<Consumidor>;
  findByCpf(cpf: Cpf): Promise<Consumidor>;
}

export const IConsumidorUseCase = Symbol('IConsumidorUseCase')
