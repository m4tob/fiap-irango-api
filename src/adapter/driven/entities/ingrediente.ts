import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('Ingrediente')
export class Ingrediente {
  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column()
  public nome: string
}
