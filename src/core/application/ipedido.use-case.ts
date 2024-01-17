
import PedidoCreateDto from '../domain/dto/input/pedido-create.dto'
import PedidoUpdateDto from '../domain/dto/input/pedido-update.dto'
import PedidoDto from '../domain/dto/output/pedido.dto'

export default interface IPedidoUseCase {
  list(): Promise<PedidoDto[]>;
  create(input: PedidoCreateDto): Promise<PedidoDto>;
  update(id: number, input: PedidoUpdateDto): Promise<PedidoDto>;
}

export const IPedidoUseCase = Symbol('IPedidoUseCase')
