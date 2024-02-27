import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default interface PedidoAlterarStatusDto {
  readonly pedidoId: number;
  readonly status: PedidoStatusEnum;
}
