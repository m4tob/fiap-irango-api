import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'

export default interface ProdutoDto {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly preco: number;
  readonly categoria: ProdutoCategoriaEnum;
  readonly deletedAt?: Date
}
