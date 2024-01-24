import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import ConsumidoresModule from '@/adapter/driver/nestjs/consumidores/consumidores.module'
import PedidosModule from '@/adapter/driver/nestjs/pedido/pedidos.module'
import ProdutosModule from '@/adapter/driver/nestjs/produtos/produtos.module'
import AppController from '@/app.controller'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'

export const appModules = [
  ConsumidoresModule,
  ProdutosModule,
  PedidosModule
]

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),

    ...appModules
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export default class AppModule { }
