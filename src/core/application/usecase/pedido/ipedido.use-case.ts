import PedidoCreateDto from '@/core/domain/dto/input/pedido-create.dto'
import PedidoUpdateDto from '@/core/domain/dto/input/pedido-update.dto'
import PedidoDto from '@/core/domain/dto/output/pedido.dto'

export default interface IPedidoUseCase {
  list(): Promise<PedidoDto[]>;
  create(input: PedidoCreateDto): Promise<PedidoDto>;
  update(id: number, input: PedidoUpdateDto): Promise<PedidoDto>;
  updatePayment(id: number, approved: boolean): Promise<PedidoDto>;
  findById(id: number): Promise<PedidoDto>;
}

export const IPedidoUseCase = Symbol('IPedidoUseCase')
