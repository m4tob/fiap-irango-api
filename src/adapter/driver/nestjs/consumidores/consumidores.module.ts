import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import ConsumidorTypeormRepository from '@/adapter/driven/repository/typeorm/consumidor-typeorm.repository'
import ConsumidoresController from '@/adapter/driver/nestjs/consumidores/consumidores.controller'
import ConsumidorUseCase from '@/core/application/consumidor.use-case'
import { IConsumidorUseCase } from '@/core/application/iconsumidor.use-case'
import { IConsumidorRepository } from '@/core/domain/repositories/iconsumidor.repository'

@Module({
  imports: [
    TypeOrmModule.forFeature([Consumidor]),
  ],
  providers: [
    { provide: IConsumidorUseCase, useClass: ConsumidorUseCase },
    { provide: IConsumidorRepository, useClass: ConsumidorTypeormRepository },
  ],
  controllers: [
    ConsumidoresController
  ],
  exports: [
    IConsumidorRepository
  ]
})
export default class ConsumidoresModule {}
