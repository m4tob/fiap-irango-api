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
      '  `produtoId` varchar(36) NULL, ' +

      '  PRIMARY KEY (`id`) ' +
      ') ENGINE=InnoDB')
      await queryRunner.query('ALTER TABLE `Ingrediente` ADD CONSTRAINT `FK_6fa9d7a981ec745ac9103b79224` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE `Ingrediente` DROP FOREIGN KEY `FK_6fa9d7a981ec745ac9103b79224`')
      await queryRunner.query('DROP TABLE `Ingrediente`')
      await queryRunner.query('DROP TABLE `Produto`')
    }
}
