import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('Consumidor')
export class Consumidor {
  @PrimaryColumn()
  public readonly id: string

  @Column()
  public nome: string

  @Column()
  public cpf: string

  @Column()
  public email: string
}
