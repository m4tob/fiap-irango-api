import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default interface ProdutoDto {
  readonly id: string;
  readonly nome: string;
  readonly description: string;
  readonly preco: number;
  readonly categoriaId: ProdutoCategoriaEnum;
}
