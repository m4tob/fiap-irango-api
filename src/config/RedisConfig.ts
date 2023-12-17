import type { ClientOpts } from 'redis'

import { Environment as envs } from '@/Environment'

interface Config extends ClientOpts {
  enabled: boolean;
}

export const RedisConfig: Config = {
  host: envs.REDIS_HOSTNAME,
  port: envs.REDIS_PORT,
  db: envs.REDIS_DB,
  enabled: envs.REDIS_ENABLED,
}
