import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export interface IngredienteDto {
  nome: string,
}
export default interface ProdutoCreateDto {
  readonly nome: string,
  readonly preco: number,
  readonly descricao: string,
  readonly categoria: ProdutoCategoriaEnum,
  readonly ingredientes?: IngredienteDto[],
  readonly imagemUrl?: string
}

