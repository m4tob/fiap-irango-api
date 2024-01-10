import ConsumidorCreateDto from '../domain/dto/input/consumidor-create.dto'
import ConsumidorUpdateDto from '../domain/dto/input/consumidor-update.dto'
import ConsumidorDto from '../domain/dto/output/consumidor.dto'

export default interface IConsumidorUseCase {
  createConsumidor(input: ConsumidorCreateDto): Promise<ConsumidorDto>;
  createConsumidor(input: ConsumidorCreateDto): Promise<ConsumidorDto>;
  updateConsumidor(input: ConsumidorUpdateDto): Promise<ConsumidorDto | undefined>;
  listConsumidores(): Promise<ConsumidorDto[]>;
}

export const IConsumidorUseCase = Symbol('IConsumidorUseCase')
