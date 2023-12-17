import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as redisStore from 'cache-manager-redis-store'
import { DataSource, DataSourceOptions } from 'typeorm'
import { addTransactionalDataSource } from 'typeorm-transactional'

import { AppController } from '@/AppController'
import { RedisConfig } from '@/config/RedisConfig'
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

        return addTransactionalDataSource(new DataSource(options))
      },
    }),
    CacheModule.register({
      store: redisStore,
      ...RedisConfig
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
