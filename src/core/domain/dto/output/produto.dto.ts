import { ProdutoCategoriaEnum } from '@/core/domain/enums/produto-categoria.enum'
import { IngredienteDto } from '@/core/domain/dto/input/produto-create.dto';

export default interface ProdutoDto {
  readonly id: string;
  readonly nome: string;
  readonly descricao: string;
  readonly preco: number;
  readonly imagemUrl: string | null ;
  readonly categoria: ProdutoCategoriaEnum;
  readonly ingredientes: IngredienteDto[];
  readonly deletedAt: Date | null
}
