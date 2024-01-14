import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as redisStore from 'cache-manager-redis-store'
import { DataSource, DataSourceOptions } from 'typeorm'
// import { addTransactionalDataSource } from 'typeorm-transactional'

import { ConsumidoresModule } from '@/adapter/driver/nestjs/consumidores/consumidores.module'
import { PedidosModule } from '@/adapter/driver/nestjs/pedido/pedidos.module'
import { ProdutosModule } from '@/adapter/driver/nestjs/produtos/produtos.module'
import AppController from '@/app.controller'
import RedisConfig from '@/config/RedisConfig'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory () {
        return TypeOrmConfig
      },
      async dataSourceFactory (options?: DataSourceOptions) {
        if (!options) {
          throw new Error('Invalid options passed')
        }
        const dataSource = await new DataSource(options).initialize()
        return dataSource
        // return addTransactionalDataSource(new DataSource(options))
      },
    }),
    CacheModule.register({
      store: redisStore,
      ...RedisConfig
    }),
    ConsumidoresModule,
    ProdutosModule,
    PedidosModule,
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export default class AppModule { }
