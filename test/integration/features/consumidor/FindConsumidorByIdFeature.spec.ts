
import { Consumidor } from '@/adapter/driven/entities/consumidor'

import IntegrationTestSetup, { ITestSetup } from '@/test/integration/setup/IntegrationTestSetup'
import { Factory } from '@/test/integration/setup/utils/FactoryUtils'

describe('Find Consumidor By Id Feature', () => {
  describe('GET /v1/consumidores/:id', () => {
    let setup: ITestSetup
    let consumidorFactory: Factory<Consumidor>
    let consumidor: Consumidor

    beforeAll(async () => {
      setup = await IntegrationTestSetup.getInstance()
      consumidorFactory = setup.factory.consumidorFactory()
    })

    beforeEach(async () => {
      consumidor = await consumidorFactory.create()
    })

    describe('when everything is valid', () => {
      it('returns the Consumidor with given ID', async () => {
        // Arrange
        const expectedResponse = {
          id: consumidor.id,
          nome: consumidor.nome,
          cpf: consumidor.cpf,
          email: consumidor.email,
        }

        // Act
        const { status, body } = await setup.server
          .request(`/v1/consumidores/${consumidor.id}`)
          .get()

        // Assert
        expect(status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data).toMatchObject(expectedResponse)
      })
    })
  })
})
