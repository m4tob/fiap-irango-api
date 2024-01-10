import { Module } from '@nestjs/common'

import { IProdutoUseCase } from 'src/core/application/iproduto.use-case'
import ProdutoUseCase from 'src/core/application/produto.use-case'
import { IProdutoRepository } from 'src/core/domain/repositories/iproduto.repository'
import { DataSource } from 'typeorm'

import { Produto } from '@/adapter/driven/entities/produto'
import ProdutoTypeormRepository from '@/adapter/driven/repository/typeorm/produto-typeorm.repository'
import { DatabaseModule } from '@/adapter/driver/nestjs/database/database.module'

import { ProdutosController } from './produtos.controller'

@Module({
  imports: [
    DatabaseModule,
  ],
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
    {
      provide: 'PRODUTO_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Produto),
      inject: ['DATA_SOURCE'],
    },

  ],
})
export class ProdutosModule {}
