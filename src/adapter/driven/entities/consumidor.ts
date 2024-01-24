import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('Consumidor')
export class Consumidor {
  constructor (params?: Partial<Consumidor>) {
    Object.assign(this, params)
  }

  @PrimaryColumn({ length: 36 })
  public readonly id: string

  @Column()
  public nome: string

  @Column()
  public cpf: string

  @Column()
  public email: string
}
