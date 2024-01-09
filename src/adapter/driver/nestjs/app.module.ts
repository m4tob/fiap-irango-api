import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as redisStore from 'cache-manager-redis-store'
import { DataSource, DataSourceOptions } from 'typeorm'

import { RedisConfig } from '@/config/RedisConfig'
import TypeOrmConfig from '@/config/typeorm/TypeOrmConfig'

import { ConsumidorsModule } from './consumidores/consumidores.module'
import { ProdutosModule } from './produtos/produtos.module'

@Module({
  imports: [ProdutosModule, ConsumidorsModule,

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
  ],
})
export class AppModule {}
