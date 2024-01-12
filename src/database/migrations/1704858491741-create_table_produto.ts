import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableProduto1704858491741 implements MigrationInterface {
    name = 'CreateTableProduto1704858491741'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `Produto` (`id` varchar(255) NOT NULL, `nome` varchar(255) NOT NULL, `descricao` varchar(255) NOT NULL, `preco` float NOT NULL, `categoria` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE `Produto`')
    }
}
