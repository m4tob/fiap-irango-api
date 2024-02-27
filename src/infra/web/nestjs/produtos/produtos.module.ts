
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { IProdutoUseCase } from '@/core/application/usecase/produto/iproduto.use-case'
import ProdutoUseCase from '@/core/application/usecase/produto/produto.use-case'
import { IProdutoRepository } from '@/core/domain/repositories/iproduto.repository'
import { Ingrediente } from '@/infra/persistence/typeorm/entities/ingrediente'
import { Produto } from '@/infra/persistence/typeorm/entities/produto'
import ProdutoTypeormRepository from '@/infra/persistence/typeorm/repository/produto-typeorm.repository'
import ProdutosController from '@/infra/web/nestjs/produtos/produtos.controller'

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
