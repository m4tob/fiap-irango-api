import Cpf from '@/core/domain/value-object/Cpf'

import ConsumidorCreateDto from '../domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '../domain/dto/input/consumidor-update.dto'
import ConsumidorDto from '../domain/dto/output/consumidor.dto'

export default interface IConsumidorUseCase {
  create(input: ConsumidorCreateDto): Promise<ConsumidorDto>;
  update(input: ConsumidorUpdateDto): Promise<ConsumidorDto | undefined>;
  findByCpf(cpf:Cpf): Promise<ConsumidorDto | undefined>;
  list(): Promise<ConsumidorDto[]>;
}

export const IConsumidorUseCase = Symbol('IConsumidorUseCase')
