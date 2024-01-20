import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'

import { Produto } from './produto'

@Entity('Ingrediente')
export class Ingrediente {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public nome: string

  @Column({
    type: 'float',
    nullable: true,
  })
  public preco?: number | null = null

  @Column({
    name: 'imagem_url',
    nullable: true,
    type: 'varchar'
  })
  public imagemUrl?: string | null = null

  @ManyToOne(() => Produto, (produto) => produto.ingredientes)
  @JoinTable()
  public produto: Produto
}
