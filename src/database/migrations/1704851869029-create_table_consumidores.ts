import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableConsumidores1704851869029 implements MigrationInterface {
    name = 'CreateTableConsumidores1704851869029'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `consumidor` (`id` varchar(255) NOT NULL, `nome` varchar(255) NOT NULL, `cpf` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `consumidor`')
    }
}
