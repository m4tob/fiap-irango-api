import ConsumidorCreateDto from './consumidor-create.dto'

export default interface ConsumidorUpdateDto extends ConsumidorCreateDto {
  readonly id: string;
}
