import { fakerPT_BR as faker } from '@faker-js/faker'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import UpdateConsumidorRequest from '@/adapter/driver/nestjs/consumidores/dto/update-consumidor.request'

import IntegrationTestSetup, { ITestSetup } from '@/test/integration/setup/IntegrationTestSetup'
import { Factory } from '@/test/integration/setup/utils/FactoryUtils'

describe('Update Consumidor Feature', () => {
  describe('PUT /v1/consumidores/:id', () => {
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
      it('updates the Consumidor with new data', async () => {
        // Arrange
        const requestBody: UpdateConsumidorRequest = {
          id: consumidor.id,
          nome: faker.person.firstName(),
          email: faker.internet.email(),
          cpf: '42553451040',
        }

        const expectedResponse = {
          id: consumidor.id,
          nome: requestBody.nome,
          cpf: requestBody.cpf,
          email: requestBody.email,
        }

        // Act
        const { status, body } = await setup.server
          .request(`/v1/consumidores/${consumidor.id}`)
          .put(requestBody)

        // Assert
        expect(status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data).toMatchObject(expectedResponse)
      })
    })
  })
})
