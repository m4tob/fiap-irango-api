import ConsumidorCreateDto from '@/core/domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '@/core/domain/dto/input/consumidor-update.dto'
import ConsumidorDto from '@/core/domain/dto/output/consumidor.dto'
import Cpf from '@/core/domain/value-object/Cpf'

export default interface IConsumidorUseCase {
  create(input: ConsumidorCreateDto): Promise<ConsumidorDto>;
  update(input: ConsumidorUpdateDto): Promise<ConsumidorDto | undefined>;
  findById(id: string): Promise<ConsumidorDto | undefined>;
  findByCpf(cpf: Cpf): Promise<ConsumidorDto | undefined>;
  list(): Promise<ConsumidorDto[]>;
}

export const IConsumidorUseCase = Symbol('IConsumidorUseCase')
