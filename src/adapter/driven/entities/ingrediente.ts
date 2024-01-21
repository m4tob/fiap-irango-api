import { Column, Entity, JoinTable, ManyToOne, PrimaryColumn } from 'typeorm'

import { Produto } from './produto'

@Entity('Ingrediente')
export class Ingrediente {
  constructor (params?: Partial<Ingrediente>) {
    Object.assign(this, params)
  }

  @PrimaryColumn({ length: 36 })
  id: string

  @Column()
  nome: string

  @Column({ name: 'imagem_url', nullable: true })
  imagemUrl?: string

  @Column({ type: 'float', nullable: true })
  preco?: number

  @ManyToOne(() => Produto, (produto) => produto.ingredientes)
  @JoinTable()
  produto: Produto
}
