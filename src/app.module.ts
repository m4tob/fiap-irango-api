import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import * as Bull from 'bull'
import { DataSource, DataSourceOptions } from 'typeorm'
// import { addTransactionalDataSource } from 'typeorm-transactional'

import ConsumidoresModule from '@/adapter/driver/nestjs/consumidores/consumidores.module'
import ProdutosModule from '@/adapter/driver/nestjs/produtos/produtos.module'
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
    BullModule.forRoot({ redis: RedisConfig } as Bull.QueueOptions),
    ConsumidoresModule,
    ProdutosModule,
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export default class AppModule { }
