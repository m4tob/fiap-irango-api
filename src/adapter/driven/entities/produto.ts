import { Column, Entity, PrimaryColumn } from 'typeorm'

import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

@Entity('produtos')
export class Produto {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public nome: string

  @Column()
  public description: string

  @Column({
    type: 'float'
  })
  public preco: number

  @Column({
    enum: ProdutoCategoriaEnum
  })
  public categoriaId: ProdutoCategoriaEnum
}
