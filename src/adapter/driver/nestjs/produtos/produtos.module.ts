import { Module } from '@nestjs/common'

import { IProdutoUseCase } from 'src/core/application/iproduto.use-case'
import ProdutoUseCase from 'src/core/application/produto.use-case'
import { IProdutoRepository } from 'src/core/domain/repositories/iproduto.repository'

import ProdutoMemoryRepository from '@/adapter/driven/repository/memory/produto-memory.repository'

import { ProdutosController } from './produtos.controller'

@Module({
  controllers: [ProdutosController],
  providers: [
    {
      provide: IProdutoUseCase,
      useClass: ProdutoUseCase,
    },

    {
      provide: IProdutoRepository,
      useClass: ProdutoMemoryRepository,
    },
  ],
})
export class ProdutosModule {}
