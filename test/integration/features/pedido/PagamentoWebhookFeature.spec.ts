
import { faker } from '@faker-js/faker'

import { PedidoStatusEnum } from '@/core/domain/enums/pedido-status.enum'
import { Pedido } from '@/infra/persistence/typeorm/entities/pedido'
import UpdatePagamentoPayload from '@/infra/web/mercado-pago/dto/update-pagamento-payload'

import IntegrationTestSetup, { ITestSetup } from '@/test/integration/setup/IntegrationTestSetup'

describe('Update Pedido By Pagamento Webhook Feature', () => {
  describe('PUT /v1/pedidos/pagamento-webhook/mercado-pago', () => {
    let setup: ITestSetup
    let pedido: Pedido

    beforeAll(async () => {
      setup = await IntegrationTestSetup.getInstance()
    })

    beforeEach(async () => {
      pedido = await setup.factory.pedido({ status: PedidoStatusEnum.PAGAMENTO_PENDENTE })
    })

    describe('when use Mercado Pago integration', () => {
      describe('when date_approved is defined', () => {
        it('updates the Pedido with RECEBIDO status', async () => {
          const requestBody: UpdatePagamentoPayload = {
            id: faker.string.uuid(),
            external_reference: `${pedido.id}`,
            date_approved: new Date().toISOString()
          }

          const expectedResponse = {
            id: pedido.id,
            status: PedidoStatusEnum.RECEBIDO,
          }

          // Act
          const { status, body } = await setup.server
            .request('/v1/pedidos/pagamento-webhook/mercado-pago')
            .post(requestBody)

          // Assert
          expect(status).toBe(200)
          expect(body.data).toMatchObject(expectedResponse)
        })
      })

      describe('when date_approved is undefined', () => {
        it('does not update the Pedido status', async () => {
          const requestBody: UpdatePagamentoPayload = {
            id: faker.string.uuid(),
            external_reference: `${pedido.id}`,
          }

          const expectedResponse = {
            id: pedido.id,
            status: PedidoStatusEnum.PAGAMENTO_PENDENTE,
          }

          // Act
          const { status, body } = await setup.server
            .request('/v1/pedidos/pagamento-webhook/mercado-pago')
            .post(requestBody)

          // Assert
          expect(status).toBe(200)
          expect(body.data).toMatchObject(expectedResponse)
        })
      })
    })
  })
})
