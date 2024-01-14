import ProdutoCreateDto from './produto-create.dto'

export default interface ProdutoUpdateDto extends ProdutoCreateDto {
  readonly id: string;
}
