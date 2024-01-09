import { Test, TestingModule } from '@nestjs/testing'

import { ConsumidorsController } from './consumidors.controller'

describe('ConsumidorsController', () => {
  let controller: ConsumidorsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumidorsController],
    }).compile()

    controller = module.get<ConsumidorsController>(ConsumidorsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
