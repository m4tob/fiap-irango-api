import { Controller, Get } from '@nestjs/common'

interface HealthCheck {
  status: 'ok' | 'error';
}

@Controller()
export default class AppController {
  constructor () { }

  @Get()
  app (): string {
    return 'iRango API'
  }

  @Get('/health-check')
  healthCheck (): HealthCheck {
    return { status: 'ok' }
  }
}
