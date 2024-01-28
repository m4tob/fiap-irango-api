import { fakerPT_BR as faker } from '@faker-js/faker'

import { Pedido } from '@/adapter/driven/entities/pedido'
import PedidoResponse from '@/adapter/driver/nestjs/pedidos/dto/pedido.response'

import IntegrationTestSetup, { ITestSetup } from '@/test/integration/setup/IntegrationTestSetup'
import { Factory } from '@/test/integration/setup/utils/FactoryUtils'

describe('List Pedido Feature', () => {
  describe('GET /v1/pedidos', () => {
    let setup: ITestSetup
    let pedidoFactory: Factory<Pedido>
    let pedidos: Pedido[]

    beforeAll(async () => {
      setup = await IntegrationTestSetup.getInstance()
      pedidoFactory = setup.factory.pedidoFactory()
    })

    beforeEach(async () => {
      pedidos = await pedidoFactory.createMany(faker.number.int({ min: 1, max: 10 }))
    })

    describe('when everything is valid', () => {
      it('returns a list with all Pedidos', async () => {
        // Arrange
        const expectedResponse = pedidos
          .map((pedido) => ({
            id: pedido.id,
            consumidorId: pedido.consumidorId,
            total: pedido.total,
            itens: pedido.itens
              .sort((a, b) => a.id.localeCompare(b.id))
              .map((item) => ({
                id: item.id,
                preco: item.preco,
                produto: {
                  id: item.produto.id,
                  nome: item.produto.nome,
                  categoria: item.produto.categoria,
                },
              })),
            status: pedido.status,
            createdAt: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/),
            updatedAt: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z/),
          }))
          .sort((a, b) => a.id - b.id)

        // Act
        const { status, body } = await setup.server
          .request('/v1/pedidos')
          .get()

        // Assert
        expect(status).toBe(200)

        const response = (body.data as PedidoResponse[]).sort((a, b) => (a.id || 0) - (b.id || 0))
        response.map((pedido) => ({
          ...pedido,
          itens: pedido.itens.sort((a, b) => a.id!.localeCompare(b.id!)),
        }))
        expect(response).toMatchObject(expectedResponse)
      })
    })
  })
})
