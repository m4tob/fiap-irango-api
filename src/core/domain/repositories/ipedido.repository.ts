import Pedido from '@/core/domain/entities/pedido'

export default interface IPedidoRepository {
  find(): Promise<Pedido[]>;
  findById(id: number): Promise<Pedido | undefined>;
  create(input: Pedido): Promise<Pedido>;
  save(input: Pedido): Promise<Pedido>;
}

export const IPedidoRepository = Symbol('IPedidoRepository')
