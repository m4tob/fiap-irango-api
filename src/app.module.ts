import { CacheModule } from '@nestjs/cache-manager'
import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as redisStore from 'cache-manager-redis-store'

import ConsumidoresModule from '@/adapter/driver/nestjs/consumidores/consumidores.module'
import PedidosModule from '@/adapter/driver/nestjs/pedidos/pedidos.module'
import ProdutosModule from '@/adapter/driver/nestjs/produtos/produtos.module'
import AppController from '@/app.controller'
import RedisConfig from '@/config/RedisConfig'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'
import AppCache from '@/core/helpers/AppCache'

export const appModules = [
  ConsumidoresModule,
  ProdutosModule,
  PedidosModule
]

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    CacheModule.register({
      store: redisStore,
      ...RedisConfig
    }),

    ...appModules
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppCache
  ],
  exports: [
    AppCache
  ]
})
export default class AppModule { }
