
import { Produto } from '@/adapter/driven/entities/produto'

import IntegrationTestSetup, { ITestSetup } from '@/test/integration/setup/IntegrationTestSetup'
import { Factory } from '@/test/integration/setup/utils/FactoryUtils'

describe('Delete Produto Feature', () => {
  describe('DELETE /v1/produtos/:id', () => {
    let setup: ITestSetup
    let produtoFactory: Factory<Produto>
    let produto: Produto

    beforeAll(async () => {
      setup = await IntegrationTestSetup.getInstance()
      produtoFactory = setup.factory.produtoFactory()
    })

    beforeEach(async () => {
      produto = await produtoFactory.create()
    })

    describe('when everything is valid', () => {
      it('deletes the Produto with given ID', async () => {
        // Act
        const { status, body } = await setup.server
          .request(`/v1/produtos/${produto.id}`)
          .delete()

        // Assert
        expect(status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data.deletedAt).toBeDefined()
      })
    })
  })
})
