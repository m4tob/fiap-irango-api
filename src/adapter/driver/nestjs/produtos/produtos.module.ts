import { Module } from '@nestjs/common'

import { IProdutoUseCase } from 'src/core/application/iproduto.use-case'
import ProdutoUseCase from 'src/core/application/produto.use-case'
import { IProdutoRepository } from 'src/core/domain/repositories/iproduto.repository'

import ProdutoTypeormRepository from '@/adapter/driven/repository/typeorm/produto-typeorm.repository'

import { ProdutosController } from './produtos.controller'

@Module({
  imports: [],
  controllers: [ProdutosController],
  providers: [
    {
      provide: IProdutoUseCase,
      useClass: ProdutoUseCase,
    },
    {
      provide: IProdutoRepository,
      useClass: ProdutoTypeormRepository,
    },
  ],
})
export class ProdutosModule {}
