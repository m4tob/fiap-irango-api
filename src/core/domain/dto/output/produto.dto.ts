import IngredienteDto from '@/core/domain/dto/output/ingrediente.dto'
import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default interface ProdutoDto {
  readonly id: string
  readonly nome: string
  readonly descricao: string
  readonly preco: number
  readonly imagemUrl?: string
  readonly categoria: ProdutoCategoriaEnum
  readonly ingredientes: IngredienteDto[]
  readonly deletedAt?: Date
}
