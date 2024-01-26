export default interface IngredienteDto {
  readonly id?: string
  readonly nome: string
  readonly imagemUrl?: string
  readonly preco?: number
  readonly produtoId?: string
}
