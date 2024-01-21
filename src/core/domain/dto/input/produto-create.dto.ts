import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export interface IngredienteDto {
  readonly id?: string
  nome: string
  imagemUrl?: string
  preco?: number
}

export default interface ProdutoCreateDto {
  readonly nome: string
  readonly imagemUrl?: string
  readonly descricao: string
  readonly preco: number
  readonly categoria: ProdutoCategoriaEnum
  readonly ingredientes?: IngredienteDto[]
}

