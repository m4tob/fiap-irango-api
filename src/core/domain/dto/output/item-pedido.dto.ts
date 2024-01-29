import IngredienteDto from '@/core/domain/dto/output/ingrediente.dto'
import ProdutoDto from '@/core/domain/dto/output/produto.dto'

export default interface ItemPedidoDto {
  readonly id?: string;
  readonly produtoId: string;
  readonly produto: ProdutoDto;
  pedidoId?: number;
  readonly preco: number;
  readonly ingredientesRemovidos: IngredienteDto[];
}
