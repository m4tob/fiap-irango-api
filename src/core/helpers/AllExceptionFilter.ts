/* eslint-disable @typescript-eslint/no-explicit-any */

import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'

import * as Sentry from '@sentry/node'
import { Response } from 'express'

import { ErrorMessages } from '@/core/helpers/ErrorMessages'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch (exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const errors = this.buildErrors(exception)

    if (!(exception instanceof HttpException)) {
      const extra = exception.constructor?.name === 'AxiosError'
        ? {
          response: exception?.response
            ? {
              status: exception.response.status,
              statusText: exception.response.statusText,
              baseURL: exception.response.config?.baseURL,
              data: exception.response.data
            }
            : undefined
        }
        : undefined
      Sentry.captureException(exception, { extra })
      console.log(exception)
    }

    response.status(statusCode).json({ statusCode, errors })
  }

  private buildErrors (exception: any): string[] {
    const message = (exception.getResponse?.() as any)?.message
    const httpExceptionErrors =
      (message && Array.isArray(message))
        ? message
        : [message || exception.cause || exception.message]

    const errors = (exception instanceof HttpException) ? httpExceptionErrors : [ErrorMessages.generic]

    return errors
  }
}
