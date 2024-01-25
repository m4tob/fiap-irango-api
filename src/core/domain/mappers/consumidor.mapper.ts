import ConsumidorDto from '@/core/domain/dto/output/consumidor.dto'
import Consumidor from '@/core/domain/entities/consumidor'
import Cpf from '@/core/domain/value-object/Cpf'
import Email from '@/core/domain/value-object/email'

export default class ConsumidorMapper {
  static toDto (consumidor: Consumidor): ConsumidorDto {
    return {
      ...consumidor,
      email: consumidor.email.toString(),
      cpf: consumidor.cpf.toString(),
    }
  }

  static toDomainEntity (input: ConsumidorDto): Consumidor {
    return new Consumidor(input.id, input.nome, new Cpf(input.cpf, false), new Email(input.email))
  }
}
