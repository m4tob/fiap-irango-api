import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm'

import { Ingrediente } from '@/infra/persistence/typeorm/entities/ingrediente'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import { Produto } from '@/infra/persistence/typeorm/entities/produto'

@Entity('ItemPedido')
export class ItemPedido {
  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column({ name: 'pedido_id' })
  public pedidoId: number

  @ManyToOne(() => Pedido, pedido => pedido.itens, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pedido_id' })
  public pedido: Pedido

  @Column({ name: 'produto_id', length: 36 })
  public produtoId: string

  @ManyToOne(() => Produto, produto => produto.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'produto_id' })
  public produto: Produto

  @Column({
    type: 'float'
  })
  public preco: number

  @ManyToMany(() => Ingrediente, ingrediente => ingrediente.id, {
    cascade: ['insert'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinTable({ name: 'ItemPedidoIngrediente' })
  public ingredientesRemovidos: Ingrediente[]
}
