import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'

import ProdutoUseCase from 'src/core/application/consumidor.use-case'
import { IConsumidorUseCase } from 'src/core/application/iconsumidor.use-case'
import { IConsumidorRepository } from 'src/core/domain/repositories/iconsumidor.repository'

import ConsumidorTypeormRepository from '@/adapter/driven/repository/typeorm/consumidor-typeorm.repository'

import { ConsumidoresController } from './consumidores.controller'

@Module({
  controllers: [ConsumidoresController],
  imports: [],
  providers: [
    ConsumidorTypeormRepository,
    {
      provide: IConsumidorUseCase,
      useClass: ProdutoUseCase,
    },
    {
      provide: IConsumidorRepository,
      useClass: ConsumidorTypeormRepository,
    },
  ],
})
export class ConsumidoresModule {}
