import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableConsumidor1704851869029 implements MigrationInterface {
    name = 'CreateTableConsumidor1704851869029'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `Consumidor` (' +
      '  `id` varchar(36) NOT NULL,' +
      '  `nome` varchar(255) NOT NULL,' +
      '  `cpf` varchar(255) NOT NULL,' +
      '  `email` varchar(255) NOT NULL,' +

      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `Consumidor`')
    }
}
