import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'

import request from 'supertest'

import AppModule from '@/AppModule'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET)', async () => {
    expect(1).toBe(1)

    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!')
  })
})
