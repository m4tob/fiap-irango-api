import { join } from 'path'
import { DataSource } from 'typeorm'

import { Consumidor } from '@/adapter/driven/entities/consumidor'
import { Environment as envs } from '@/Environment'

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        synchronize: false,
        migrationsRun: false,
        host: envs.DB_HOSTNAME,
        port: envs.DB_PORT,
        username: envs.DB_USERNAME,
        password: envs.DB_PASSWORD,
        database: envs.DB_DATABASE,
        extra: {
          connectionLimit: envs.DB_CONNECTION_LIMIT,
        },
        logging: false,
        entities: [
          join(__dirname, '..', '..', 'driven', 'entities', '*{.ts,.js}'), Consumidor
        ],
        bigNumberStrings: false,
        timezone: '+00:00',
      })

      return dataSource.initialize()
    },
  },
]
