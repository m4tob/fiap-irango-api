import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import ProdutoUseCase from 'src/core/application/consumidor.use-case'
import { IConsumidorUseCase } from 'src/core/application/iconsumidor.use-case'
import { IConsumidorRepository } from 'src/core/domain/repositories/iconsumidor.repository'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import ConsumidorTypeormRepository from '@/adapter/driven/repository/typeorm/consumidor-typeorm.repository'

import { ConsumidoresController } from './consumidores.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Consumidor]),
  ],
  providers: [
    { provide: IConsumidorUseCase, useClass: ProdutoUseCase },
    { provide: IConsumidorRepository, useClass: ConsumidorTypeormRepository },
  ],
  controllers: [
    ConsumidoresController
  ],
})
export class ConsumidoresModule {}
