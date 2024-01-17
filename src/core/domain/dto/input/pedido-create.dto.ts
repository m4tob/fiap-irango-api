
export interface ItemPedidoCreateDto {
  readonly produtoId: string;
  readonly ingredientesRemovidos: string[];
}

export default interface PedidoCreateDto {
  readonly consumidorId?: string;
  readonly itens: ItemPedidoCreateDto[];
}
