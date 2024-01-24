import { Injectable } from '@nestjs/common'

import { Connection } from 'typeorm'

@Injectable()
export class TestDatabaseUtils {
  constructor (private readonly connection: Connection) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-DEV-AND-TESTS')
    }
  }

  async getEntitiesTables () {
    const entities = this.connection.entityMetadatas
    return entities.map(entity => entity.tableName)
  }

  async cleanAll (tables: string[]) {
    try {
      const truncates = await Promise.all(tables.map(async (table) => `TRUNCATE \`${table}\``))
      await this.connection.query(`SET FOREIGN_KEY_CHECKS=0;${truncates.join(';')};SET FOREIGN_KEY_CHECKS=1;`)
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`)
    }
  }

  async truncateAll () {
    const tables = await this.getEntitiesTables()
    await this.cleanAll(tables)
  }
}
