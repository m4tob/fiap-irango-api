import { BullModuleOptions } from '@nestjs/bull'

import { Environment as envs } from '@/environment'

export const BullQueueConfig = (options: BullModuleOptions) => {
  const prefix = envs.NODE_ENV === 'test' ? 'bull_test' : undefined
  return { ...options, prefix }
}
