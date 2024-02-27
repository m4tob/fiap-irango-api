import { Test, TestingModule } from '@nestjs/testing'

import PedidosController from '@/infra/web/nestjs/pedidos/pedidos.controller'

describe('PedidosController', () => {
  let controller: PedidosController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidosController],
    }).compile()

    controller = module.get<PedidosController>(PedidosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
