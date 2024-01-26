
import { Produto } from '@/adapter/driven/entities/produto'

import IntegrationTestSetup, { ITestSetup } from '@/test/integration/setup/IntegrationTestSetup'
import { Factory } from '@/test/integration/setup/utils/FactoryUtils'

describe('Find Produto By Id Feature', () => {
  describe('GET /v1/produtos/:id', () => {
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
      it('returns the Produto with given ID', async () => {
        // Arrange
        const expectedResponse = {
          id: produto.id,
          nome: produto.nome,
          imagemUrl: produto.imagemUrl,
          descricao: produto.descricao,
          preco: produto.preco,
          categoria: produto.categoria,
          ingredientes: produto.ingredientes.sort((a, b) => a.id.localeCompare(b.id))
        }

        // Act
        const { status, body } = await setup.server
          .request(`/v1/produtos/${produto.id}`)
          .get()

        // Assert
        expect(status).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data).toMatchObject(expectedResponse)
      })
    })
  })
})
