import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DataSource, DataSourceOptions } from 'typeorm'
// import { addTransactionalDataSource } from 'typeorm-transactional'

import ConsumidoresModule from '@/adapter/driver/nestjs/consumidores/consumidores.module'
import ProdutosModule from '@/adapter/driver/nestjs/produtos/produtos.module'
import AppController from '@/app.controller'
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
    ConsumidoresModule,
    ProdutosModule,
  ],
  controllers: [
    AppController
  ],
  providers: [],
})
export default class AppModule { }
