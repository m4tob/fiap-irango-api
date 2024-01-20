import { Column, Entity, PrimaryColumn } from 'typeorm'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

@Entity('Produto')
export class Produto {
  constructor (params?: Partial<Produto>) {
    Object.assign(this, params)
  }

  @PrimaryColumn()
  public readonly id: string

  @Column()
  public nome: string

  @Column()
  public descricao: string

  @Column({
    type: 'float'
  })
  public preco: number

  @Column({
    enum: ProdutoCategoriaEnum
  })
  public categoria: ProdutoCategoriaEnum

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true
  })
  public deletedAt: Date | null = null

  @Column({
    name: 'imagem_url',
    nullable: true
  })
  public imagemUrl: string | null = null
}