import type { ClientOpts } from 'redis'

import { Environment as envs } from '@/Environment'

interface RedisConfig extends ClientOpts {
  enabled: boolean;
}

export default {
  host: envs.REDIS_HOSTNAME,
  port: envs.REDIS_PORT,
  db: envs.REDIS_DB,
  enabled: envs.REDIS_ENABLED,
} as RedisConfig
