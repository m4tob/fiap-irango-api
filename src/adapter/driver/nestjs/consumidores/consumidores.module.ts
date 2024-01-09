import { Module } from '@nestjs/common'

import ConsumidorMemoryRepository from 'src/adapter/driven/repository/memory/consumidor-memory.repository'
import ProdutoUseCase from 'src/core/application/consumidor.use-case'
import { IConsumidorUseCase } from 'src/core/application/iconsumidor.use-case'
import { IConsumidorRepository } from 'src/core/domain/repositories/iconsumidor.repository'

import { ConsumidorsController } from './consumidores.controller'

@Module({
  controllers: [ConsumidorsController],
  providers: [
    {
      provide: IConsumidorUseCase,
      useClass: ProdutoUseCase,
    },

    {
      provide: IConsumidorRepository,
      useClass: ConsumidorMemoryRepository,
    },
  ],
})
export class ConsumidorsModule {}
