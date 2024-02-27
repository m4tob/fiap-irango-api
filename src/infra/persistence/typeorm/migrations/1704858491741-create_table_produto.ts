import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTableProduto1704858491741 implements MigrationInterface {
    name = 'CreateTableProduto1704858491741'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE `Produto` ( ' +
      '  `id` varchar(36) NOT NULL, ' +
      '  `nome` varchar(255) NOT NULL, ' +
      '  `imagem_url` varchar(255) NULL, ' +
      '  `descricao` text NOT NULL, ' +
      '  `preco` float NOT NULL, ' +
      '  `categoria` varchar(20) NOT NULL, ' +
      '  `deleted_at` timestamp NULL, ' +

      '  PRIMARY KEY (`id`) ' +
      ') ENGINE=InnoDB')

      await queryRunner.query('CREATE TABLE `Ingrediente` ( ' +
      '  `id` varchar(36) NOT NULL, ' +
      '  `nome` varchar(255) NOT NULL, ' +
      '  `imagem_url` varchar(255) NULL, ' +
      '  `preco` float NULL, ' +
      '  `produto_id` varchar(36) NULL, ' +

      '  PRIMARY KEY (`id`) ' +
      ') ENGINE=InnoDB')
      await queryRunner.query('ALTER TABLE `Ingrediente` ADD CONSTRAINT `FK_7c6a2bddcda5e096ce69072ac9d` FOREIGN KEY (`produto_id`) REFERENCES `Produto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Ingrediente` DROP FOREIGN KEY `FK_7c6a2bddcda5e096ce69072ac9d`')
      await queryRunner.query('DROP TABLE `Ingrediente`')
      await queryRunner.query('DROP TABLE `Produto`')
    }
}
