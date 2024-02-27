import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import ConsumidorUseCase from '@/core/application/usecase/consumidor/consumidor.use-case'
import { IConsumidorUseCase } from '@/core/application/usecase/consumidor/iconsumidor.use-case'
import Consumidor from '@/core/domain/entities/consumidor'
import { IConsumidorRepository } from '@/core/domain/repositories/iconsumidor.repository'
import ConsumidorTypeormRepository from '@/infra/persistence/typeorm/repository/consumidor-typeorm.repository'
import ConsumidoresController from '@/infra/web/nestjs/consumidores/consumidores.controller'

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
    IConsumidorRepository,
  ]
})
export default class ConsumidoresModule {}
