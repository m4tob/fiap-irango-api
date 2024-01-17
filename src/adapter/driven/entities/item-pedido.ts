import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

import { Ingrediente } from '@/adapter/driven/entities/ingrediente'
import { Pedido } from '@/adapter/driven/entities/pedido'
import { Produto } from '@/adapter/driven/entities/produto'

@Entity('ItemPedido')
export class ItemPedido {
  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column({ name: 'pedido_id' })
  public pedidoId: number

  @ManyToOne(() => Pedido, pedido => pedido.itens)
  @JoinColumn({ name: 'pedido_id' })
  public pedido: Pedido

  @Column({ name: 'produto_id', length: 36 })
  public produtoId: string

  @ManyToOne(() => Produto, produto => produto.id)
  @JoinColumn({ name: 'produto_id' })
  public produto: Produto

  @Column({
    type: 'float'
  })
  public preco: number

  @ManyToMany(() => Ingrediente, ingrediente => ingrediente.id, { cascade: ['insert'] })
  @JoinTable({ name: 'ItemPedidoIngrediente' })
  public ingredientesRemovidos: Ingrediente[]
}
