import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'

export default interface PedidoUpdateDto {
  readonly status: PedidoStatusEnum;
}
