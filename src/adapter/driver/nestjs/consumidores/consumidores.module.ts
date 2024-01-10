import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'

import ProdutoUseCase from 'src/core/application/consumidor.use-case'
import { IConsumidorUseCase } from 'src/core/application/iconsumidor.use-case'
import { IConsumidorRepository } from 'src/core/domain/repositories/iconsumidor.repository'
import { DataSource } from 'typeorm'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import ConsumidorTypeormRepository from '@/adapter/driven/repository/typeorm/consumidor-typeorm.repository'
import { DatabaseModule } from '@/adapter/driver/nestjs/database/database.module'

import { ConsumidoresController } from './consumidores.controller'

@Module({
  controllers: [ConsumidoresController],
  imports: [
    DatabaseModule,
  ],
  providers: [
    ConsumidorTypeormRepository,
    {
      provide: IConsumidorUseCase,
      useClass: ProdutoUseCase,
    },
    {
      provide: 'CONSUMIDOR_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Consumidor),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: IConsumidorRepository,
      useClass: ConsumidorTypeormRepository,
    },
  ],
})
export class ConsumidoresModule {}
