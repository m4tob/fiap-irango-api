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
}
