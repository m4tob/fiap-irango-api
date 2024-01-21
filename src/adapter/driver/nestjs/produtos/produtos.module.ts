import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Ingrediente } from '@/adapter/driven/entities/ingrediente'
import { Produto } from '@/adapter/driven/entities/produto'
import ProdutoTypeormRepository from '@/adapter/driven/repository/typeorm/produto-typeorm.repository'
import ProdutosController from '@/adapter/driver/nestjs/produtos/produtos.controller'
import { IProdutoUseCase } from '@/core/application/iproduto.use-case'
import ProdutoUseCase from '@/core/application/produto.use-case'
import { IProdutoRepository } from '@/core/domain/repositories/iproduto.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Produto,
      Ingrediente
    ]),
  ],
  providers: [
    { provide: IProdutoUseCase, useClass: ProdutoUseCase },
    { provide: IProdutoRepository, useClass: ProdutoTypeormRepository },
  ],
  controllers: [
    ProdutosController
  ],
  exports: [
    IProdutoRepository
  ]
})
export default class ProdutosModule {}
