import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default interface ProdutoCreateDto {
  readonly nome: string,
  readonly preco: number,
  readonly description: string,
  readonly categoriaId: ProdutoCategoriaEnum,
}
