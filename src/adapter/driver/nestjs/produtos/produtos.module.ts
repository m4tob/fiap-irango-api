import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IProdutoUseCase } from 'src/core/application/iproduto.use-case'
import ProdutoUseCase from 'src/core/application/produto.use-case'
import { IProdutoRepository } from 'src/core/domain/repositories/iproduto.repository'

import { Produto } from '@/adapter/driven/entities/produto'
import { Ingrediente } from '@/adapter/driven/entities/ingrediente'
import ProdutoTypeormRepository from '@/adapter/driven/repository/typeorm/produto-typeorm.repository'

import { ProdutosController } from './produtos.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Produto,Ingrediente]),
  ],
  providers: [
    { provide: IProdutoUseCase, useClass: ProdutoUseCase },
    { provide: IProdutoRepository, useClass: ProdutoTypeormRepository },
  ],
  controllers: [
    ProdutosController
  ],
})
export class ProdutosModule {}
