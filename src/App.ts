/* eslint-disable import/first */
/* eslint-disable import-helpers/order-imports */
import dotenv from 'dotenv'
dotenv.config()

import { Environment as envs } from '@/Environment'
envs.validate()

import { INestApplication, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import * as Sentry from '@sentry/node'
import * as bodyParser from 'body-parser'
import helmet from 'helmet'
import { initializeTransactionalContext } from 'typeorm-transactional'

import { AppModule } from '@/AppModule'
import { SentryConfig } from '@/config/SentryConfig'
import { AllExceptionFilter } from '@/core/helpers/AllExceptionFilter'
import { ResponseTransformInterceptor } from '@/core/helpers/ResponseTransformInterceptor'

const configureSentry = (app: INestApplication) => {
  Sentry.init(SentryConfig)
  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())
  app.use(Sentry.Handlers.errorHandler())
}

const configureSwagger = (app: INestApplication) => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('iRango API')
    .setDescription('iRango API documentation')
    .setVersion('0.0.1')
    // .addBearerAuth(undefined, 'Mobile')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('docs', app, document)
}

async function bootstrap () {
  initializeTransactionalContext()

  const app = await NestFactory.create(AppModule)

  configureSentry(app)
  configureSwagger(app)

  app.use(helmet())

  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  app.enableCors({ optionsSuccessStatus: 200 })
  app.enableShutdownHooks()
  app.useGlobalInterceptors(new ResponseTransformInterceptor())
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(envs.PORT)
}

bootstrap().catch((err) => {
  console.error(err)
})
