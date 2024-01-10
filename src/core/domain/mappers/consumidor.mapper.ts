import Cpf from '@/core/domain/value-object/Cpf'
import Email from '@/core/domain/value-object/email'

import ConsumidorDto from '../dto/output/consumidor.dto'
import Consumidor from '../entities/consumidor'

export default class ConsumidorMapper {
  static toConsumidorDto (consumidor: Consumidor): ConsumidorDto {
    return {
      ...consumidor,
      email: consumidor.email.toString(),
      cpf: consumidor.cpf.toString(),
    }
  }

  static toDtoForConsumidor (input: ConsumidorDto): Consumidor {
    return new Consumidor(input.id, input.nome, new Cpf(input.cpf), new Email(input.email))
  }
}
