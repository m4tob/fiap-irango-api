import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableProdutos1704858491741 implements MigrationInterface {
    name = 'CreateTableProdutos1704858491741'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `produtos` (`id` varchar(255) NOT NULL, `nome` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `preco` float NOT NULL, `categoriaId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `produtos`')
    }
}
